package com.resturant.project.mapper;

import com.resturant.project.model.entity.Item;
import com.resturant.project.model.requestBody.ItemRequest;
import org.springframework.stereotype.Component;

@Component
public class ItemMapper {

    public void mapTo(ItemRequest itemRequest,Item item){
        if(itemRequest.getItemName()!=null){
            item.setItemName(itemRequest.getItemName());
        }
        if(itemRequest.getCalories()!=0){
            item.setCalories(itemRequest.getCalories());
        }
        if(itemRequest.getDes()!=null){
            item.setDes(itemRequest.getDes());
        }
        if(itemRequest.getFats()!=0){
            item.setFats(itemRequest.getFats());
        }
        if(itemRequest.getImg()!=null){
            item.setImg(itemRequest.getImg());
        }
        if(itemRequest.getPrice()!=0){
            item.setPrice(itemRequest.getPrice());
        }
    }
}
