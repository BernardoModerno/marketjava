package com.market.market.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.market.market.entity.OrdemLog;

public interface OrdemLogRepository extends JpaRepository<OrdemLog, String> {
    
}
