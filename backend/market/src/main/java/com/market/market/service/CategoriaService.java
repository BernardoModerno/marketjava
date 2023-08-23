package com.market.market.service;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.market.market.entity.Categoria;
import com.market.market.exception.ResourceNotFoundException;
import com.market.market.repository.CategoriaRepository;

@Service
public class CategoriaService {
    
    @Autowired
    private CategoriaRepository categoriaRepository;

    public Categoria findById(String id) {
        return categoriaRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Categoria com id "+ id +" não encontrada"));
    }

    public List<Categoria> findAll() {
        return categoriaRepository.findAll();
    }

    public Categoria create(Categoria categoria) {
        categoria.setId(UUID.randomUUID().toString());
        return categoriaRepository.save(categoria);
    }

    public Categoria edit(Categoria categoria) {
        return categoriaRepository.save(categoria);
    }

    public void deleteById(String id) {
        categoriaRepository.deleteById(id);
    }
}
