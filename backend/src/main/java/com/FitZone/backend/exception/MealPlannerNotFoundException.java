package com.FitZone.backend.exception;

public class MealPlannerNotFoundException extends RuntimeException {
    public MealPlannerNotFoundException(Long id){
        super("Could not found the  id"+id);
    }
}
