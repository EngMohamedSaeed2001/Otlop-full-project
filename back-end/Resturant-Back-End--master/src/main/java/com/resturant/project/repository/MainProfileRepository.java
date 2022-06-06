package com.resturant.project.repository;

import com.resturant.project.model.entity.Profile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MainProfileRepository extends JpaRepository<Profile, Long> {
    Profile findProfileByName(String name);
}