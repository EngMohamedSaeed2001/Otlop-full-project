package com.resturant.project.model.requestBody;

import com.resturant.project.model.entity.Item;
import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder

public class CategoryRequest {
    private String categoryName;
    private String categoryPhoto;
}
