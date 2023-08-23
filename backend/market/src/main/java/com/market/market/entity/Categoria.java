package com.market.market.entity;

import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.Id;

import lombok.Data;

@Entity
@Data
public class Categoria implements Serializable {

    @Id
    private String id;
    private String nome;
    
}
