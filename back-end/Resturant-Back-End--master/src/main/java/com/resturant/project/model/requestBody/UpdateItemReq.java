package com.resturant.project.model.requestBody;

import com.resturant.project.model.entity.Item;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UpdateItemReq {
    private long itemName;
    private Item item;
}
