package com.market.market.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.market.market.entity.Carrinho;

public interface CarrinhoRepository extends JpaRepository<Carrinho, String>{
    
}
