package com.resturant.project.controller.apisWithoutToken;

import com.resturant.project.model.entity.Category;
import com.resturant.project.service.AdminServices.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController


public class ApisWithoutToken {
    @Autowired
    CategoryService categoryService;

    @GetMapping(value = "/getAllCategory")
    public List<Category> getAllCategory(){
        return categoryService.getAllCategory();
    }

}
