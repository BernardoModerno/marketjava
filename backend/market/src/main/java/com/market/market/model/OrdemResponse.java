package com.market.market.model;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import com.market.market.entity.Ordem;
import com.market.market.entity.OrdemItem;

import lombok.Data;

@Data
public class OrdemResponse implements Serializable {

    private String id;
    private String numeroDoPedido;
    private Date data;
    private String nomeDoCliente;
    private String enderecoEnvio;
    private Date horaDaMensagem;
    private BigDecimal quantia;
    private BigDecimal envio;
    private BigDecimal total;
    private List<OrdemResponse.Item> items;

    public OrdemResponse(Ordem ordem, List<OrdemItem> ordemItems) {
        this.id = ordem.getId();
        this.numeroDoPedido = ordem.getNumero();
        this.data = ordem.getData();
        this.nomeDoCliente = ordem.getUsuario().getNome();
        this.enderecoEnvio = ordem.getEnderecoEnvio();
        this.horaDaMensagem = ordem.getHoraDaMensagem();
        this.quantia = ordem.getQuantia();
        this.envio = ordem.getEnvio();
        this.total = ordem.getTotal();
        items = new ArrayList<>();
        for (OrdemItem ordemItem : ordemItems) {
            Item item = new Item();
            item.setProdutoId(ordemItem.getProduto().getId());
            item.setNomeProduto(ordemItem.getDescricao());
            item.setQuantidade(ordemItem.getQuantidade());
            item.setPreco(ordemItem.getPreco());
            item.setQuantia(ordemItem.getQuantia());
            items.add(item);
        }
    }

    @Data
    public static class Item implements Serializable {
        private String produtoId;
        private String nomeProduto;
        private Double quantidade;
        private BigDecimal preco;
        private BigDecimal quantia;
    }
    
}
