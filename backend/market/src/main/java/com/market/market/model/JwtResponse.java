package com.market.market.model;

import java.io.Serializable;

import lombok.Data;

@Data
public class JwtResponse implements Serializable {
    private String token;
    private String refreshToken;
    private String type = "Bearer";
    private String username;
    private String email;
    private String role;
    private String nome;

    public JwtResponse(
            String accessToken,
            String refreshToken,
            String username,
            String email,
            String role,
            String nome) {
        this.username = username;
        this.email = email;
        this.token = accessToken;
        this.refreshToken = refreshToken;
        this.role = role;
        this.nome = nome;
    }

}