package com.resturant.project.repository;

import com.resturant.project.model.entity.Item;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ItemRepository extends JpaRepository<Item,Long> {
    Item findByItemName(String name) ;
}
