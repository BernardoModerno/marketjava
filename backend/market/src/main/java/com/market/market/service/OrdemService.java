package com.market.market.service;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.market.market.entity.Ordem;
import com.market.market.entity.OrdemItem;
import com.market.market.entity.Produto;
import com.market.market.entity.Usuario;
import com.market.market.exception.BadRequestException;
import com.market.market.exception.ResourceNotFoundException;
import com.market.market.model.CarrinhoRequest;
import com.market.market.model.OrdemRequest;
import com.market.market.model.OrdemResponse;
import com.market.market.model.StatusOrdem;
import com.market.market.repository.OrdemItemRepository;
import com.market.market.repository.OrdemRepository;
import com.market.market.repository.ProdutoRepository;

@Service
public class OrdemService {

    @Autowired
    private ProdutoRepository produtoRepository;
    @Autowired
    private OrdemRepository ordemRepository;
    @Autowired
    private OrdemItemRepository ordemItemRepository;
    @Autowired
    private CarrinhoService carrinhoService;
    @Autowired
    private OrdemLogService ordemLogService;

    @Transactional
    public OrdemResponse create(String username, OrdemRequest request) {
        Ordem ordem = new Ordem();
        ordem.setId(UUID.randomUUID().toString());
        ordem.setData(new Date());
        ordem.setNumero(generateNumeroDoPedido());
        ordem.setUsuario(new Usuario(username));
        ordem.setEnderecoEnvio(request.getEnderecoEnvio());
        ordem.setStatusOrdem(StatusOrdem.DRAFT);
        ordem.setHoraDaMensagem(new Date());

        List<OrdemItem> items = new ArrayList<>();
        for (CarrinhoRequest k : request.getItems()) {
            Produto produto = produtoRepository.findById(k.getProdutoId())
                    .orElseThrow(() -> new BadRequestException("ID do produto " + k.getProdutoId() + " não encontrado"));
            if (produto.getEstoque() < k.getQuantidade()) {
                throw new BadRequestException("Estoque insuficiente");
            }

            OrdemItem pi = new OrdemItem();
            pi.setId(UUID.randomUUID().toString());
            pi.setProduto(produto);
            pi.setDescricao(produto.getNome());
            pi.setQuantidade(k.getQuantidade());
            pi.setPreco(produto.getPreco());
            pi.setQuantia(new BigDecimal(pi.getPreco().doubleValue() * pi.getQuantidade()));
            pi.setOrdem(ordem);
            items.add(pi);
        }

        BigDecimal quantia = BigDecimal.ZERO;
        for (OrdemItem ordemItem : items) {
            quantia = quantia.add(ordemItem.getQuantia());
        }

        ordem.setQuantia(quantia);
        ordem.setEnvio(request.getEnvio());
        ordem.setTotal(ordem.getQuantia().add(ordem.getEnvio()));

        Ordem saved = ordemRepository.save(ordem);
        for (OrdemItem ordemItem : items) {
            ordemItemRepository.save(ordemItem);
            Produto produto = ordemItem.getProduto();
            produto.setEstoque(produto.getEstoque() - ordemItem.getQuantidade());
            produtoRepository.save(produto);
            carrinhoService.delete(username, produto.getId());
        }

        // log
        ordemLogService.createLog(username, ordem, OrdemLogService.DRAFT, "Pedido criado com sucesso");
        OrdemResponse ordemResponse = new OrdemResponse(saved, items);
        return ordemResponse;

    }

    @Transactional
    public Ordem cancelOrdem(String ordemId, String userId) {
        Ordem ordem = ordemRepository.findById(ordemId)
                .orElseThrow(() -> new ResourceNotFoundException("ordem ID " + ordemId + " não encontrado"));
        if (!userId.equals(ordem.getUsuario().getId())) {
            throw new BadRequestException("Este pedido só pode ser cancelado pela pessoa em questão.");
        }

        if (!StatusOrdem.DRAFT.equals(ordem.getStatusOrdem())) {
            throw new BadRequestException("Este pedido não pode ser cancelado porque já foi processado");
        }
        //DRAFT, PAGO, EMBALADO, ENTREGUE, FEITO, CANCELADO
        ordem.setStatusOrdem(StatusOrdem.CANCELADO);
        Ordem saved = ordemRepository.save(ordem);
        ordemLogService.createLog(userId, saved, OrdemLogService.CANCELADO, "Pedido cancelado com sucesso");
        return saved;
    }

    @Transactional
    public Ordem aceitarPedidoOrdem(String ordemId, String userId) {
        Ordem ordem = ordemRepository.findById(ordemId)
                .orElseThrow(() -> new ResourceNotFoundException("ordem ID " + ordemId + " não encontrado"));
        if (!userId.equals(ordem.getUsuario().getId())) {
            throw new BadRequestException("Este pedido só pode ser cancelado pela pessoa em questão");
        }

        if (!StatusOrdem.ENTREGUE.equals(ordem.getStatusOrdem())) {
            throw new BadRequestException(
                    "Falha no recebimento, o status atual do pedido é: " + ordem.getStatusOrdem().name());
        }

        ordem.setStatusOrdem(StatusOrdem.CANCELADO);
        Ordem saved = ordemRepository.save(ordem);
        ordemLogService.createLog(userId, saved, OrdemLogService.CANCELADO, "Pedido cancelado com sucesso");
        return saved;
    }

    public List<Ordem> findAllOrdemUser(String userId, int page, int limit) {
        return ordemRepository.findByUsuarioId(userId,
                PageRequest.of(page, limit, Sort.by("horaDaMensagem").descending()));
    }

    public List<Ordem> search(String filterText, int page, int limit) {
        return ordemRepository.search(filterText.toLowerCase(),
                PageRequest.of(page, limit, Sort.by("horaDaMensagem").descending()));
    }

    private String generateNumeroDoPedido() {
        return String.format("%016d", System.nanoTime());
    }

    @Transactional
    public Ordem confirmarPagamentoOrdem(String ordemId, String userId) {
        Ordem ordem = ordemRepository.findById(ordemId)
                .orElseThrow(() -> new ResourceNotFoundException("ordem ID " + ordemId + " não encontrado"));

        if (!StatusOrdem.DRAFT.equals(ordem.getStatusOrdem())) {
            throw new BadRequestException(
                    "A confirmação do pedido falhou, o status atual do pedido é: " + ordem.getStatusOrdem().name());
        }

        ordem.setStatusOrdem(StatusOrdem.PAGO);
        Ordem saved = ordemRepository.save(ordem);
        ordemLogService.createLog(userId, saved, OrdemLogService.PAGO, "Pagamento bem sucedido confirmado.");
        return saved;
    }

    @Transactional
    public Ordem embalar(String ordemId, String userId) {
        Ordem ordem = ordemRepository.findById(ordemId)
                .orElseThrow(() -> new ResourceNotFoundException("ordem ID " + ordemId + " não encontrado"));

        if (!StatusOrdem.PAGO.equals(ordem.getStatusOrdem())) {
            throw new BadRequestException(
                    "Falha na embalagem do pedido, o status atual do pedido é: " + ordem.getStatusOrdem().name());
        }

        ordem.setStatusOrdem(StatusOrdem.EMBALADO);
        Ordem saved = ordemRepository.save(ordem);
        ordemLogService.createLog(userId, saved, OrdemLogService.EMBALADO, "pedido está sendo preparado");
        return saved;
    }

    @Transactional
    public Ordem enviar(String ordemId, String userId) {
        Ordem ordem = ordemRepository.findById(ordemId)
                .orElseThrow(() -> new ResourceNotFoundException("ordem ID " + ordemId + " não encontrado"));

        if (!StatusOrdem.EMBALADO.equals(ordem.getStatusOrdem())) {
            throw new BadRequestException(
                    "Falha na entrega do pedido, o status atual do pedido é: " + ordem.getStatusOrdem().name());
        }

        ordem.setStatusOrdem(StatusOrdem.ENTREGUE);
        Ordem saved = ordemRepository.save(ordem);
        ordemLogService.createLog(userId, saved, OrdemLogService.ENTREGUE, "Os pedidos estão sendo enviados.");
        return saved;
    }
    
}
