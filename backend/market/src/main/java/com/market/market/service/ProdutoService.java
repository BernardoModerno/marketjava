package com.market.market.service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import com.market.market.entity.Produto;
import com.market.market.exception.BadRequestException;
import com.market.market.exception.ResourceNotFoundException;
import com.market.market.repository.CategoriaRepository;
import com.market.market.repository.ProdutoRepository;

@Service
public class ProdutoService {

    @Autowired
    private CategoriaRepository categoriaRepository;
    
    @Autowired
    private ProdutoRepository produtoRepository;

    public List<Produto> findAll() {
        return produtoRepository.findAll();
    }

    public Produto findById(String id) {
        return produtoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Produto com id "+ id +" não encontrado"));
    }

    public List<Produto> findByCategoriaId(String id) {
        return produtoRepository.findAllByCategoriaIdOrderByNomeAsc(id);
                // .orElseThrow(() -> new ResourceNotFoundException("Entidade não encontrada"));

    }

    public Produto create(Produto produto) {
        if (!StringUtils.hasText(produto.getNome())) {
            throw new BadRequestException("O nome do produto não pode ficar vazio.");
        }

        if (produto.getCategoria() == null) {
            throw new BadRequestException("A categoria não pode ficar vazia.");
        }

        if (!StringUtils.hasText(produto.getCategoria().getId())) {
            throw new BadRequestException("O Id da categoria não pode ficar vazio.");
        }

        categoriaRepository.findById(produto.getCategoria().getId())
                .orElseThrow(() -> new BadRequestException(
                        "Categoria ID " + produto.getCategoria().getId() + " não encontrado no banco de dados."));
        produto.setId(UUID.randomUUID().toString());
        return produtoRepository.save(produto);
    }

    public Produto edit(Produto produto) {
        if (!StringUtils.hasText(produto.getId())) {
            throw new BadRequestException("O ID do produto é obrigatório.");
        }

        if (!StringUtils.hasText(produto.getNome())) {
            throw new BadRequestException("O nome do produto não pode ficar vazio.");
        }

        if (produto.getCategoria() == null) {
            throw new BadRequestException("A categoria não pode ficar vazia.");
        }

        if (!StringUtils.hasText(produto.getCategoria().getId())) {
            throw new BadRequestException("A categoria de ID não pode ficar vazia.");
        }

        categoriaRepository.findById(produto.getCategoria().getId())
                .orElseThrow(() -> new BadRequestException(
                        "Categoria ID " + produto.getCategoria().getId() + " não encontrado no banco de dados."));
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
