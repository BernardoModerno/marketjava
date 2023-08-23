package com.market.market.entity;

import java.io.Serializable;
import java.math.BigDecimal;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import lombok.Data;

@Data
@Entity
public class OrdemItem implements Serializable{
    
    @Id
    private String id;
    @JoinColumn
    @ManyToOne
    private Ordem ordem;
    @JoinColumn
    @ManyToOne
    private Produto produto;
    private String descricao;
    private Double quantidade;
    private BigDecimal preco;
    private BigDecimal quantia;
}
