package com.resturant.project.repository;

import com.resturant.project.model.entity.Cart;
import com.resturant.project.model.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CartRepo extends JpaRepository<Cart,Long> {

    Cart findCartByUserEmail(String userEmail) ;
}
