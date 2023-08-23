package com.market.market.service;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.market.market.entity.Produto;
import com.market.market.exception.ResourceNotFoundException;
import com.market.market.repository.ProdutoRepository;

@Service
public class ProdutoService {
    
    @Autowired
    private ProdutoRepository produtoRepository;

    public List<Produto> findAll() {
        return produtoRepository.findAll();
    }

    public Produto findById(String id) {
        return produtoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Produto com id "+ id +" não encontrado"));
    }

    public Produto create(Produto produto) {
        produto.setId(UUID.randomUUID().toString());
        return produtoRepository.save(produto);
    }

    public Produto edit(Produto produto) {
        return produtoRepository.save(produto);
    }

    public Produto alterarImagem(String id, String foto) {
        Produto produto = findById(id);
        produto.setFoto(foto);
        return produtoRepository.save(produto);
    }

    public void deleteById(String id) {
        produtoRepository.deleteById(id);
    }
}
