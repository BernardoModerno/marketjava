package com.market.market.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.market.market.entity.Categoria;

public interface CategoriaRepository extends JpaRepository<Categoria, String> {
    
}
