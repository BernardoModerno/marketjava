package com.market.market.entity;

import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.Id;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
public class Usuario implements Serializable{
    
    @Id
    private String id;
    @JsonIgnore
    private String password;
    private String nome;
    
    private String endereco;
    
    private String email;
    
    private String telefone;
    
    private String roles;
    
    private Boolean isAtivo;

    public Usuario(String username) {
        this.id = username;
    }
    
}
