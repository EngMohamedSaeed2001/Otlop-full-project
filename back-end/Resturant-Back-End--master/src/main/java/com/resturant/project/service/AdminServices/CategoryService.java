package com.resturant.project.service.AdminServices;

import com.resturant.project.HelperMessage;
import com.resturant.project.model.entity.Category;
import com.resturant.project.model.entity.Item;
import com.resturant.project.model.requestBody.CategoryRequest;
import com.resturant.project.model.requestBody.UpdateCategoryRequest;
import com.resturant.project.repository.CategoryRepository;
import com.resturant.project.repository.ItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class CategoryService {

    @Autowired
    CategoryRepository categoryRepository;
    @Autowired
    ItemRepository itemRepository;

    public void addCategory(CategoryRequest category) {
        Category category1 =  categoryRepository.findCategoryByCategoryName(category.getCategoryName());
        if(category1 ==null){
            Category cate = Category.builder()
                    .categoryName(category.getCategoryName())
                    .categoryPhoto(category.getCategoryPhoto())
                    .build();
            categoryRepository.save(cate);
        }else
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, HelperMessage.CATEGORY_ALREADY_EXIST);
    }


    public List<Category> getAllCategory(){
        return categoryRepository.findAll();
    }
    public Category getCategory(String name){
        return categoryRepository.findCategoryByCategoryName(name);
    }

    public void updateCategoryName(UpdateCategoryRequest categoryRequest){
        Category category = categoryRepository.findCategoryByCategoryName(categoryRequest.getCategoryName());
        if(category!=null){
            if(categoryRepository.findCategoryByCategoryName(categoryRequest.getNewName())==null){
                if(categoryRequest.getNewName()!=null){
                    for(Item item:category.getItems()){
                        item.setCategoryName(categoryRequest.getNewName());
                        itemRepository.save(item);
                    }
                    category.setCategoryName(categoryRequest.getNewName());
                    if(categoryRequest.getCategoryPhoto()!=null)
                        category.setCategoryPhoto(categoryRequest.getCategoryPhoto());
                    categoryRepository.save(category);
                }else {
                    throw new ResponseStatusException(HttpStatus.BAD_REQUEST,HelperMessage.NULL_NAME);
                }
            }else
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, HelperMessage.CATEGORY_ALREADY_EXIST);
        }else
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, HelperMessage.CATEGORY_NAME_WRONG);
    }
    public void deleteCategory(String categoryName ){
        Category category = categoryRepository.findCategoryByCategoryName(categoryName);
        if(category!=null){
            categoryRepository.delete(category);
        }else
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,HelperMessage.CATEGORY_NAME_WRONG);
    }

}
