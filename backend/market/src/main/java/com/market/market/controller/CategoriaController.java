package com.market.market.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.market.market.entity.Categoria;
import com.market.market.service.CategoriaService;

@RestController
@RequestMapping("/api")
public class CategoriaController {
    
    @Autowired
    private CategoriaService categoriaService;

    @GetMapping("/categorias")
    public List<Categoria> findAll() {
        return categoriaService.findAll();
    }

    @GetMapping("/categorias/{id}")
    public Categoria findById(@PathVariable("id") String id) {
        return categoriaService.findById(id);
    }

    @PostMapping("/categorias")
    public Categoria create(@RequestBody Categoria categoria) {
        return categoriaService.create(categoria);
    }

    @PutMapping("/categorias")
    public Categoria edit(@RequestBody Categoria categoria) {
        return categoriaService.edit(categoria);
    }

    @DeleteMapping("/categorias/{id}")
    public void deleteById(@PathVariable("id") String id) {
        categoriaService.deleteById(id);
    }
}
