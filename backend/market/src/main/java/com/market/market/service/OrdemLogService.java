package com.market.market.service;

import java.util.Date;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.market.market.entity.Ordem;
import com.market.market.entity.OrdemLog;
import com.market.market.entity.Usuario;
import com.market.market.repository.OrdemLogRepository;

@Service
public class OrdemLogService {

    @Autowired
    private OrdemLogRepository ordemLogRepository;
    //DRAFT, PAGO, EMBALADO, ENTREGUE, FEITO, CANCELADO
    public final static int DRAFT = 0;
    public final static int PAGO = 10;
    public final static int EMBALADO = 20;
    public final static int ENTREGUE = 30;
    public final static int FEITO = 40;
    public final static int CANCELADO = 90;

    public void createLog(String username, Ordem ordem, int type, String message) {
        OrdemLog p = new OrdemLog();
        p.setId(UUID.randomUUID().toString());
        p.setLogMessage(message);
        p.setLogType(type);
        p.setOrdem(ordem);
        p.setUsuario(new Usuario(username));
        p.setHorario(new Date());
        ordemLogRepository.save(p);
    }
    
}
