package com.market.market.service;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.market.market.entity.Carrinho;
import com.market.market.entity.Produto;
import com.market.market.entity.Usuario;
import com.market.market.exception.BadRequestException;
import com.market.market.repository.CarrinhoRepository;
import com.market.market.repository.ProdutoRepository;


@Service
public class CarrinhoService {

    @Autowired
    private ProdutoRepository produtoRepository;
    @Autowired
    private CarrinhoRepository carrinhoRepository;

    @Transactional
    public Carrinho addCarrinho(String username, String produtoId, Double quantidade) {
        Produto produto = produtoRepository.findById(produtoId)
                .orElseThrow(() -> new BadRequestException("ID do produto " + produtoId + " não encontrado."));

        Optional<Carrinho> optional = carrinhoRepository.findByUsuarioIdAndProdutoId(username, produtoId);
        Carrinho carrinho;
        if (optional.isPresent()) {
            carrinho = optional.get();
            carrinho.setQuantidade(carrinho.getQuantidade()+ quantidade);
            carrinho.setQuantia(new BigDecimal(carrinho.getPreco().doubleValue() * carrinho.getQuantidade()));
            carrinhoRepository.save(carrinho);
        } else {
            carrinho = new Carrinho();
            carrinho.setId(UUID.randomUUID().toString());
            carrinho.setProduto(produto);
            carrinho.setQuantidade(quantidade);
            carrinho.setPreco(produto.getPreco());
            carrinho.setQuantia(new BigDecimal(carrinho.getPreco().doubleValue() * carrinho.getQuantidade()));
            carrinho.setUsuario(new Usuario(username));
            carrinhoRepository.save(carrinho);
        }

        return carrinho;

    }

    @Transactional
    public Carrinho updateQuantidade(String username, String produtoId, Double quantidade) {
        Carrinho carrinho = carrinhoRepository.findByUsuarioIdAndProdutoId(username, produtoId)
                .orElseThrow(() -> new BadRequestException(
                        "O ID do produto " + produtoId + " não foi encontrado em seu carrinho."));
        carrinho.setQuantidade(quantidade);
        carrinho.setQuantia(new BigDecimal(carrinho.getPreco().doubleValue() * carrinho.getQuantidade()));
        carrinhoRepository.save(carrinho);
        return carrinho;
    }

    @Transactional
    public void delete(String username, String produtoId) {
        Carrinho carrinho = carrinhoRepository.findByUsuarioIdAndProdutoId(username, produtoId)
                .orElseThrow(() -> new BadRequestException(
                        "O ID do produto " + produtoId + " não foi encontrado em seu carrinho."));

        carrinhoRepository.delete(carrinho);
    }

    public List<Carrinho> findByUsuarioId(String username) {
        return carrinhoRepository.findByUsuarioId(username);
    }

}
