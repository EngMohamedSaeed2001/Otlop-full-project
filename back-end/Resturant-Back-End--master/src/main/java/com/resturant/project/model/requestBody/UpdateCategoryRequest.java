package com.resturant.project.model.requestBody;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder

public class UpdateCategoryRequest {
    private String categoryName;
    private String categoryPhoto;
    private String newName;
}
