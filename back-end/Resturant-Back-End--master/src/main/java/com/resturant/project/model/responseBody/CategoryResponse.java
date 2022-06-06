package com.resturant.project.model.responseBody;

import com.resturant.project.model.entity.Item;
import lombok.*;

import java.util.List;
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CategoryResponse {
    private String categoryName;
    private List<Item> items;
}
