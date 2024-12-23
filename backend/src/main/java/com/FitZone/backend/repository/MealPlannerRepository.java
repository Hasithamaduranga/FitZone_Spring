package com.FitZone.backend.repository;

import com.FitZone.backend.model.MealPlannerModel;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MealPlannerRepository extends JpaRepository<MealPlannerModel,Long> {
}
