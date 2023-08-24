package com.market.market.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.market.market.entity.Usuario;

public interface UsuarioRepository extends JpaRepository<Usuario, String> {

    Boolean existsByEmail(String email);
    
}
