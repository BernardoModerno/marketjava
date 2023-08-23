package com.market.market.entity;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import com.market.market.model.StatusOrdem;

import lombok.Data;

@Data
@Entity
public class Ordem implements Serializable{
    
    @Id
    private String id;
    private String numero;
    @Temporal(TemporalType.DATE)
    private Date data;
    @JoinColumn
    @ManyToOne
    private Usuario usuario;
    private String enderecoEnvio;
    private BigDecimal quantidade;
    private BigDecimal envio;
    private BigDecimal total;
    @Enumerated(EnumType.STRING)
    private StatusOrdem statusOrdem;
    @Temporal(TemporalType.TIMESTAMP)
    private Date horaDaMensagem;
}
