package com.resturant.project.model.responseBody;

import com.resturant.project.model.entity.OrderItem;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;
import java.util.List;

@Setter
@Getter
@Builder
public class OrderDetailResponse {
    private List<ItemAttributs> soledItems ;

    private String userEmail ;
    private double orderPrice;
    private String phone;
    private String address;

    private Date orderTime ;
}
