package com.resturant.project.model.requestBody;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@Builder
public class OrderRequest {
    private String itemName;
    private String userEmail;
    private long size;
    private long quantity;
}
