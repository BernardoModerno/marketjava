package com.market.market.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.market.market.entity.Carrinho;

public interface CarrinhoRepository extends JpaRepository<Carrinho, String>{

    Optional<Carrinho> findByUsuarioIdAndProdutoId(String username, String produtoId);

    List<Carrinho> findByUsuarioId(String username);
    
}
