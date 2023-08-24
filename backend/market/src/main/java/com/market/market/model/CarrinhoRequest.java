package com.market.market.model;

import java.io.Serializable;

import lombok.Data;

@Data
public class CarrinhoRequest implements Serializable {
    
    private String produtoId;
    private Double quantidade;
}
