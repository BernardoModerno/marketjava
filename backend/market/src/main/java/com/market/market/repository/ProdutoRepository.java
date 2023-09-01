package com.market.market.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.market.market.entity.Produto;

public interface ProdutoRepository extends JpaRepository<Produto, String> {

    List<Produto> findAllByCategoriaIdOrderByNomeAsc(String id);
    
}
