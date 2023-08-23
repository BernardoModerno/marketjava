package com.market.market.entity;

import java.math.BigDecimal;
import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import lombok.Data;

@Data
@Entity
public class Carrinho {
    
    @Id
    private String id;
    @JoinColumn
    @ManyToOne
    private Produto produto;
    @JoinColumn
    @ManyToOne
    private Usuario usuario;
    private Double quantidade;
    private BigDecimal preco;
    private BigDecimal quantia;
    @Temporal(TemporalType.TIMESTAMP)
    private Date horaDeCriacao;
}
