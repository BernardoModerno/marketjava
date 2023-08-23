package com.market.market.entity;

import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.Id;
import lombok.Data;

@Entity
@Data
public class Usuario implements Serializable{
    
    @Id
    private String id;
    private String password;
    private String nome;
    private String endereco;
    private String email;
    private String telefone;
    private String roles;
    private Boolean isAtivo;
}
