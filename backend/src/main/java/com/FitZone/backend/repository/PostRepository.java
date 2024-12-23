package com.FitZone.backend.repository;

import com.FitZone.backend.model.PostModel;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PostRepository extends JpaRepository<PostModel,Long> {
}
