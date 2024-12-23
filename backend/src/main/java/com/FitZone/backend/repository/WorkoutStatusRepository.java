package com.FitZone.backend.repository;

import com.FitZone.backend.model.WorkoutStatusModel;
import org.springframework.data.jpa.repository.JpaRepository;

public interface WorkoutStatusRepository extends JpaRepository<WorkoutStatusModel,Long> {
}
