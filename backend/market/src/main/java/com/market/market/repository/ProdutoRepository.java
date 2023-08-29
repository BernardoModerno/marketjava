package com.market.market.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.market.market.entity.Produto;

public interface ProdutoRepository extends JpaRepository<Produto, String> {

    Optional<Produto> findByCategoriaIdOrderByNomeAsc(String id);
    
}
