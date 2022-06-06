package com.resturant.project.repository;

import com.resturant.project.model.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CategoryRepository extends JpaRepository<Category,Long> {
    public Category findCategoryByCategoryName(String name);
}
