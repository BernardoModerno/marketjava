package com.market.market.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.market.market.entity.Carrinho;
import com.market.market.model.CarrinhoRequest;
import com.market.market.security.service.UserDetailsImpl;
import com.market.market.service.CarrinhoService;

@RestController
@RequestMapping("/api")
@PreAuthorize("isAuthenticated()")
public class CarrinhoController {

    @Autowired
    private CarrinhoService carrinhoService;

    @GetMapping("/carrinho")
    public List<Carrinho> findByUsuarioId(@AuthenticationPrincipal UserDetailsImpl user) {
        return carrinhoService.findByUsuarioId(user.getUsername());
    }

    @PostMapping("/carrinho")
    public Carrinho create(@AuthenticationPrincipal UserDetailsImpl user, @RequestBody CarrinhoRequest request) {
        return carrinhoService.addCarrinho(user.getUsername(), request.getProdutoId(), request.getQuantidade());
    }

    @PatchMapping("/carrinho/{produtoId}")
    public Carrinho update(@AuthenticationPrincipal UserDetailsImpl user, @PathVariable("produtoId") String produtoId,
            @RequestParam("quantidade") Double quantidade) {
        return carrinhoService.updateQuantidade(user.getUsername(), produtoId, quantidade);
    }

    @DeleteMapping("/carrinho/{produtoId}")
    public void delete(@AuthenticationPrincipal UserDetailsImpl user, @PathVariable("produtoId") String produtoId) {
        carrinhoService.delete(user.getUsername(), produtoId);
    }
    
}
