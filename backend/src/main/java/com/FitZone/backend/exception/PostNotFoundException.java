package com.FitZone.backend.exception;

public class PostNotFoundException extends RuntimeException  {
    public PostNotFoundException(Long id){
        super("Could not found the  id"+id);
    }
}
