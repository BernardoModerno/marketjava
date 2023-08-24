package com.market.market.repository;

import java.util.List;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.market.market.entity.Ordem;

public interface OrdemRepository extends JpaRepository<Ordem, String> {

    List<Ordem> findByUsuarioId(String userId, Pageable pageable);

    @Query("SELECT p FROM Ordem p WHERE LOWER(p.numero) LIKE %:filterText% OR LOWER(p.usuario.nome) LIKE %:filterText%")
    List<Ordem> search(@Param("filterText") String filterText, Pageable pageable);
    
}
