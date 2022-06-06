package com.resturant.project.controller.adminController;

import com.resturant.project.model.UserDetailsDto;
import com.resturant.project.model.entity.*;
import com.resturant.project.model.requestBody.*;
import com.resturant.project.model.responseBody.OrderDetailResponse;
import com.resturant.project.service.AdminServices.AdminServices;
import com.resturant.project.service.AdminServices.CategoryService;
import com.resturant.project.service.AdminServices.CommonServices;
import com.resturant.project.service.AdminServices.ItemService;
import com.resturant.project.service.userService.RatingServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "admin/")
@PreAuthorize("hasRole('ROLE_ADMIN')")
public class AdminController {
    @Autowired
    CategoryService categoryService;
    @Autowired
    ItemService itemService;

    @Autowired
    AdminServices adminServices;
    @Autowired
    private RatingServices ratingServices ;


    @Autowired
    private CommonServices commonServices ;

   ///////////////////////// Category CRUD /////////////////////////////////////////////////
    @PostMapping(value = "/addCategory")
    public void addCategory(@RequestBody CategoryRequest categoryRequest){
        categoryService.addCategory(categoryRequest);
    }

    @PatchMapping(value = "/updateCategory")
    public void updateCategoryName(@RequestBody UpdateCategoryRequest categoryRequest){
        categoryService.updateCategoryName(categoryRequest);
    }

    @DeleteMapping(value = "/deleteCategory/{categoryName}")
    public void deleteCategory(@PathVariable String categoryName){
        categoryService.deleteCategory(categoryName);
    }
    /////////////////////////////Item CRUD ///////////////////////////////////////////////////////////////////

    @PostMapping(value = "/addItem/{categoryName}")
    public void addItem(@RequestBody ItemRequest itemRequest, @PathVariable String categoryName){
        itemService.addItem(itemRequest,categoryName);
    }
    @GetMapping(value = "/getAllItem")
    public List<Item> getAllItem(){
        return itemService.getAllItem();
    }

    @PatchMapping(value = "/updateItem/{itemName}")
    public void updateItem(@RequestBody ItemRequest itemRequest,@PathVariable String itemName){
        itemService.updateItem(itemRequest,itemName);
    }

    @DeleteMapping(value = "/deleteItem/{itemName}")
    public void deleteItem(@PathVariable String itemName){
        itemService.deleteItem(itemName);
    }

    /////////////////////////////////////
    @GetMapping(value = "/getAllOrderDetails")
    public List<OrderDetailResponse> getAllOrderDetails(){
        return commonServices.getAllOrderDetails() ;
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////
    @PostMapping(value = "/suspendUser")
    public void suspendUser(@RequestBody EmailRequest request){
        adminServices.suspendUser(request.getEmail());
    }
    @PostMapping(value = "/unSuspendUser")
    public void unSuspendUser(@RequestBody EmailRequest request){
        adminServices.unSuspendUser(request.getEmail());
    }

    @PostMapping(value = "/addUser")
    public User addUser(@RequestBody UserDetailsDto userDetailsDto){
        return adminServices.addUser(userDetailsDto);
    }
    @PostMapping(value = "/upgradeUser")
    public void upgradeUser(@RequestBody EmailRequest emailRequest){
        adminServices.upgradeToAdmin(emailRequest.getEmail());
    }
    @PostMapping(value = "/unUpgradeUser")
    public void unUpgradeUser(@RequestBody EmailRequest emailRequest){
        adminServices.unUpgrade(emailRequest.getEmail());
    }


    @GetMapping(value = "/getAllContactUs")
    public List<ContactUs> getAllContactUs(){
        return adminServices.getAllContactUs();
    }

    @GetMapping(value = "/getAllOpinion")
    public List<Opinion> getAllOpinion(){
        return ratingServices.getAllOpinion();
    }

    @GetMapping(value = "/getAllUsers")
    public List<User> getAllUsers(){
        return adminServices.getAllUsers();
    }


}
