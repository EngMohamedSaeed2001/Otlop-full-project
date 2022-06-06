package com.resturant.project.service.AdminServices;

import com.resturant.project.HelperMessage;
import com.resturant.project.mapper.ItemMapper;
import com.resturant.project.model.entity.Category;
import com.resturant.project.model.entity.Item;
import com.resturant.project.model.requestBody.ItemRequest;
import com.resturant.project.repository.CategoryRepository;
import com.resturant.project.repository.ItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class ItemService {
    @Autowired
    ItemRepository itemRepository;

    @Autowired
    CategoryRepository categoryRepository;

    @Autowired
    ItemMapper itemMapper;

    public void addItem(ItemRequest itemRequest,String categoryName) {
        Item item =  itemRepository.findByItemName(itemRequest.getItemName());
        if(item ==null){
            Item item1 = Item.builder()
                    .itemName(itemRequest.getItemName())
                    .des(itemRequest.getDes())
                    .price(itemRequest.getPrice())
                    .img(itemRequest.getImg())
                    .calories(itemRequest.getCalories())
                    .fats(itemRequest.getFats())
                    .build();
            Category category = categoryRepository.findCategoryByCategoryName(categoryName);
            if(category!=null){
                item1.setCategoryName(categoryName);
                category.getItems().add(itemRepository.save(item1));
                categoryRepository.save(category);
            }else
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, HelperMessage.CATEGORY_NAME_WRONG);
        }else
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, HelperMessage.ITEM_ALREADY_EXIST);
    }


    public List<Item> getAllItem(){
        return itemRepository.findAll();
    }
    public Item getItem(String name){
        return itemRepository.findByItemName(name);
    }

    public void updateItem(ItemRequest itemReq,String name){
        Item item = itemRepository.findByItemName(name);
        if(item!=null){
           itemMapper.mapTo(itemReq,item);
           itemRepository.save(item);
        }else
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,HelperMessage.WRONG_ITEM_NAME);
    }
    public void deleteItem(String itemName ){
        Item item = itemRepository.findByItemName(itemName);
        if(item!=null){
            itemRepository.delete(item);
        }else
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,HelperMessage.WRONG_ITEM_NAME);
    }
}
