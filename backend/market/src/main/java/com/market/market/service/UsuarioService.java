package com.market.market.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import com.market.market.entity.Usuario;
import com.market.market.exception.BadRequestException;
import com.market.market.exception.ResourceNotFoundException;
import com.market.market.repository.UsuarioRepository;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    public Usuario findById(String id) {
        return usuarioRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Usuário com id " + id + " não encontrado."));
    }

    public List<Usuario> findAll() {
        return usuarioRepository.findAll();
    }

    public Usuario create(Usuario usuario) {
        if (!StringUtils.hasText(usuario.getId())) {
            throw new BadRequestException("Nome de usuário é requerido.");
        }

        if (usuarioRepository.existsById(usuario.getId())) {
            throw new BadRequestException("Username " + usuario.getId() + " já registrado.");
        }

        if (!StringUtils.hasText(usuario.getEmail())) {
            throw new BadRequestException("Email deve ser preenchido");
        }

        if (usuarioRepository.existsByEmail(usuario.getEmail())) {
            throw new BadRequestException("Email " + usuario.getEmail() + " já registrado.");
        }

        usuario.setIsAtivo(true);
        return usuarioRepository.save(usuario);
    }

    public Usuario edit(Usuario usuario) {
        if (!StringUtils.hasText(usuario.getId())) {
            throw new BadRequestException("Username deve ser preenchido");
        }

        if (!StringUtils.hasText(usuario.getEmail())) {
            throw new BadRequestException("Email deve ser preenchido");
        }

        return usuarioRepository.save(usuario);
    }

    public void deleteById(String id) {
        usuarioRepository.deleteById(id);
    }
    
}
