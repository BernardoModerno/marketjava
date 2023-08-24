package com.market.market.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.market.market.entity.OrdemItem;

public interface OrdemItemRepository extends JpaRepository<OrdemItem, String> {
    
}
