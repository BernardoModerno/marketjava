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

import com.market.market.entity.Usuario;
import com.market.market.service.UsuarioService;

@RestController
@RequestMapping("/api")
@PreAuthorize("isAuthenticated()")
public class UsuarioController {
    
    @Autowired
    private UsuarioService usuarioService;

    @GetMapping("/usuario")
    public List<Usuario> findAll() {
        return usuarioService.findAll();
    }

    @GetMapping("/usuario/{id}")
    public Usuario findById(@PathVariable("id") String id) {
        return usuarioService.findById(id);
    }

    @PostMapping("/usuario")
    public Usuario create(@RequestBody Usuario usuario) {
        return usuarioService.create(usuario);
    }

    @PutMapping("/usuario")
    public Usuario edit(@RequestBody Usuario usuario) {
        return usuarioService.edit(usuario);
    }

    @PutMapping("/profile")
    public Usuario updateProfile(@RequestBody Usuario usuario) {
        Usuario old = usuarioService.findById(usuario.getId());
        usuario.setPassword(old.getPassword());
        return usuarioService.edit(usuario);
    }

    @DeleteMapping("/usuario/{id}")
    public void deleteById(@PathVariable("id") String id) {
        usuarioService.deleteById(id);
    }
}
