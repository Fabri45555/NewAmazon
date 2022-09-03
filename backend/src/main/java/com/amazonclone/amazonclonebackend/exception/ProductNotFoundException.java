package com.amazonclone.amazonclonebackend.exception;

public class ProductNotFoundException extends RuntimeException {
    public ProductNotFoundException(String msg){
        super(msg);
    }
}
