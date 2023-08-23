package com.market.market.entity;

import java.io.Serializable;
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
public class OrdemLog implements Serializable {
    
    @Id
    private String id;
    @JoinColumn
    @ManyToOne
    private Ordem ordem;
    @JoinColumn
    @ManyToOne
    private Usuario usuario;
    private Integer logType;
    private String logMessage;
    @Temporal(TemporalType.TIMESTAMP)
    private Date horario;
}
