package com.FitZone.backend.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

import java.util.HashMap;
import java.util.Map;

public class WorkoutStatusNotFoundException extends RuntimeException {
    public WorkoutStatusNotFoundException(Long id){
        super("Could not found the user with id"+id);
    }
}
