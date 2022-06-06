package com.resturant.project.controller.userController;

import com.resturant.project.model.CartOperations.SubmitCartRequest;
import com.resturant.project.model.entity.Cart;
import com.resturant.project.model.entity.Item;
import com.resturant.project.model.entity.Opinion;
import com.resturant.project.model.requestBody.*;
import com.resturant.project.service.userService.RatingServices;
import com.resturant.project.service.userService.UserServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController



@RequestMapping("user/")
@PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_USER')")
public class UserController {

    @Autowired
    private UserServices userServices ;

    @Autowired
    private RatingServices ratingServices ;

    @PostMapping(value = "/addContactInfo")
    public void addContactInfo(@RequestBody ContactReq contactInfo){
        userServices.addContactInfo(contactInfo);
    }
    @GetMapping(value = "/getCart/{email}")
    public Cart getCart(@PathVariable String email){
        return userServices.getCart(email) ;
    }

    @PostMapping(value = "/orderItem")
    public void orderItem(@RequestBody OrderRequest orderItemReq){
        userServices.orderItem(orderItemReq);
    }

    @PostMapping(value = "/deleteItem")
    public void deleteItem(@RequestBody OrderItemReq orderItemReq){
        userServices.deleteItem(orderItemReq.getItemName(), orderItemReq.getEmail());
    }

    @PostMapping(value = "/orderCart")
    public Double orderCart(@RequestBody SubmitCartRequest submitCartRequest){
        return userServices.orderCart(submitCartRequest);
    }

    @GetMapping(value = "/search/{name}")
    public List<Item> search(@PathVariable String name){
        return userServices.search(name) ;
    }

    // opinion



    @PostMapping(value = "/clearCart")
    public void clearCart(@RequestBody EmailRequest emailRequest){
        userServices.cleanCart(emailRequest.getEmail());
    }

    @PostMapping(value = "/addOpinion")
    public void addOpinion(@RequestBody OpinionRequest request){
        ratingServices.addOpinion(request);
    }
}
