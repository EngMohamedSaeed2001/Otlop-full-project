package com.resturant.project.repository;

import com.resturant.project.model.entity.Opinion;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OpinionRepo extends JpaRepository<Opinion,Long> {
    Opinion findAllByUserEmail (String email) ;
}
