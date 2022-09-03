package com.amazonclone.amazonclonebackend.exception;


public class OrderNotFoundException extends RuntimeException {

    public OrderNotFoundException(String msg){
        super(msg);
    }

}
