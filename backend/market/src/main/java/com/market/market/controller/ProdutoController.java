package com.market.market.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.market.market.entity.Produto;
import com.market.market.service.ProdutoService;

@RestController
@RequestMapping("/api")
@PreAuthorize("isAuthenticated()")
public class ProdutoController {

    @Autowired
    private ProdutoService produtoService;

    @GetMapping("/produto")
    public List<Produto> findAll() {
        return produtoService.findAll();
    }

    @GetMapping("/produto/{id}")
    public Produto findById(@PathVariable("id") String id) {
        return produtoService.findById(id);
    }

    @PostMapping("/produto")
    public Produto create(@RequestBody Produto produto) {
        return produtoService.create(produto);
    }

    @PutMapping("/produto")
    public Produto edit(@RequestBody Produto produto) {
        return produtoService.edit(produto);
    }

    @DeleteMapping("/produto/{id}")
    public void deleteById(@PathVariable("id") String id) {
        produtoService.deleteById(id);
    }
    
}
