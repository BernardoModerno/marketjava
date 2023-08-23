package com.market.market.entity;

import java.io.Serializable;
import java.math.BigDecimal;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import lombok.Data;

@Entity
@Data
public class Produto implements Serializable {
    
    @Id
    private String id;
    private String nome;
    private String descricao;
    private String foto;
    @JoinColumn
    @ManyToOne
    private Categoria categoria;
    private BigDecimal preco;
    private Double estoque;
}
