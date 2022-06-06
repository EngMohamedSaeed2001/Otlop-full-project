package com.resturant.project.repository;

import com.resturant.project.model.entity.DatabaseFile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


import java.util.Optional;

@Repository
public interface DatabaseFileRepository extends JpaRepository<DatabaseFile, String> {
    Optional<DatabaseFile> findByFileName(String fileName);

}