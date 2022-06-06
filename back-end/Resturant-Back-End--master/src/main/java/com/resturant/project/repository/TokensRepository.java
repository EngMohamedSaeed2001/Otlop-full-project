package com.resturant.project.repository;

import com.resturant.project.model.entity.TokenStore;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TokensRepository extends JpaRepository<TokenStore,Long> {
}
