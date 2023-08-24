package com.market.market.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.market.market.entity.Ordem;
import com.market.market.model.OrdemRequest;
import com.market.market.model.OrdemResponse;
import com.market.market.security.service.UserDetailsImpl;
import com.market.market.service.OrdemService;

@RestController
@RequestMapping("/api")
@PreAuthorize("isAuthenticated()")
public class OrdemController {

    @Autowired
    private OrdemService ordemService;

    @PostMapping("/ordem")
    @PreAuthorize("hasAuthority('user')")
    public OrdemResponse create(
            @AuthenticationPrincipal UserDetailsImpl user,
            @RequestBody OrdemRequest request) {
        return ordemService.create(user.getUsername(), request);
    }

    @PatchMapping("/ordem/{ordemId}/cancel")
    @PreAuthorize("hasAuthority('user')")
    public Ordem cancelOrdemUser(
            @AuthenticationPrincipal UserDetailsImpl user,
            @PathVariable("ordemId") String ordemId) {
        return ordemService.cancelOrdem(ordemId, user.getUsername());
    }

    @PatchMapping("/ordem/{ordemId}/aceitar")
    @PreAuthorize("hasAuthority('user')")
    public Ordem aceitar(
            @AuthenticationPrincipal UserDetailsImpl user,
            @PathVariable("ordemId") String ordemId) {
        return ordemService.aceitarPedidoOrdem(ordemId, user.getUsername());
    }

    @PatchMapping("/ordem/{ordemId}/confirma")
    @PreAuthorize("hasAuthority('admin')")
    public Ordem confirmaOrdem(
            @AuthenticationPrincipal UserDetailsImpl user,
            @PathVariable("ordemId") String ordemId) {
        return ordemService.confirmarPagamentoOrdem(ordemId, user.getUsername());
    }

    @PatchMapping("/ordem/{ordemId}/embalar")
    @PreAuthorize("hasAuthority('admin')")
    public Ordem packing(
            @AuthenticationPrincipal UserDetailsImpl user,
            @PathVariable("ordemId") String ordemId) {
        return ordemService.embalar(ordemId, user.getUsername());
    }

    @PatchMapping("/ordem/{ordemId}/envia")
    @PreAuthorize("hasAuthority('admin')")
    public Ordem enviaOrdem(
            @AuthenticationPrincipal UserDetailsImpl user,
            @PathVariable("ordemId") String ordemId) {
        return ordemService.enviar(ordemId, user.getUsername());
    }

    @GetMapping("/ordem")
    @PreAuthorize("hasAuthority('user')")
    public List<Ordem> findAllOrdemUser(@AuthenticationPrincipal UserDetailsImpl user,
            @RequestParam(name = "page", defaultValue = "0", required = false) int page,
            @RequestParam(name = "limit", defaultValue = "25", required = false) int limit) {
        return ordemService.findAllOrdemUser(user.getUsername(), page, limit);
    }

    @GetMapping("/ordem/admin")
    @PreAuthorize("hasAuthority('admin')")
    public List<Ordem> search(@AuthenticationPrincipal UserDetailsImpl user,
            @RequestParam(name = "filterText", defaultValue = "", required = false) String filterText,
            @RequestParam(name = "page", defaultValue = "0", required = false) int page,
            @RequestParam(name = "limit", defaultValue = "25", required = false) int limit) {
        return ordemService.search(filterText, page, limit);
    }
    
}
