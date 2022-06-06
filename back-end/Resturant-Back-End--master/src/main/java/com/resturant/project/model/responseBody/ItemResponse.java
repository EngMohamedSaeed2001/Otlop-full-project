package com.resturant.project.model.responseBody;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ItemResponse {
    private String itemName;
    private String des;
    private String img;
    private double price;
    private long fats;
    private long calories;
}
