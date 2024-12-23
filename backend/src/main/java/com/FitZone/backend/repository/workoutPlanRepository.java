package com.FitZone.backend.repository;

import com.FitZone.backend.model.WorkoutPlanModel;
import org.springframework.data.jpa.repository.JpaRepository;

public interface workoutPlanRepository extends JpaRepository<WorkoutPlanModel,Long> {

}
