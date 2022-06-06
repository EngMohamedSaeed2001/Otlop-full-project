package com.resturant.project.repository;

import com.resturant.project.model.entity.OrderItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<OrderItem,Long> {
    OrderItem findOrderByItemName(String itemName);
    OrderItem findOrderItemByEmailAndItemName(String email,String itemName);
    List<OrderItem> findAllByEmail(String email);
}
