package com.market.market.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.market.market.entity.Ordem;

public interface OrdemItemRepository extends JpaRepository<Ordem, String> {
    
}
