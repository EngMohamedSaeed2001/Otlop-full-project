package com.resturant.project.repository;

import com.resturant.project.model.entity.OrderDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface OrderDetailRepo extends JpaRepository<OrderDetail,Long> {
}
