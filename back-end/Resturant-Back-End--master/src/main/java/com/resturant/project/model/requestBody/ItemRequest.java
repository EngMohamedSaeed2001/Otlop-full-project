package com.resturant.project.model.requestBody;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ItemRequest {
    private String itemName;
    private String des;
    private String img;
    private double price;
    private long fats;
    private long calories;
}
