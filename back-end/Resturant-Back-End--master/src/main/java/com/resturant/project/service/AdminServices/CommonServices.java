package com.resturant.project.service.AdminServices;

import com.resturant.project.model.entity.OrderDetail;
import com.resturant.project.model.entity.OrderItem;
import com.resturant.project.model.responseBody.ItemAttributs;
import com.resturant.project.model.responseBody.OrderDetailResponse;
import com.resturant.project.repository.OrderDetailRepo;
import com.resturant.project.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class CommonServices {

    @Autowired
    private OrderDetailRepo orderDetailRepo ;
    @Autowired
    UserRepository userRepository;

    public List<OrderDetailResponse> getAllOrderDetails(){
        List<OrderDetail> orderDetails =   orderDetailRepo.findAll();
        List<OrderDetailResponse> orderDetailResponses =new ArrayList<>();
        for(OrderDetail orderDetail : orderDetails){
            OrderDetailResponse orderDetailResponse = OrderDetailResponse.builder()
                    .orderPrice(orderDetail.getOrderPrice())
                    .orderTime(orderDetail.getOrderTime())
                    .userEmail(orderDetail.getUserEmail())
                    .phone(orderDetail.getPhone())
                    .address(orderDetail.getAddress())
                    .soledItems(new ArrayList<>())
                    .build();
            String [] arr = orderDetail.getSoledItems().split("\\|");
            int size = arr.length;
            for(int i = 0; i<size;i++){
                ItemAttributs orderItem = new ItemAttributs();
                orderItem.setItemName(arr[i]);
                i++;
                orderItem.setPrice(arr[i]);
                i++;
                orderItem.setQuantity(arr[i]);
                orderDetailResponse.getSoledItems().add(orderItem);
            }

            orderDetailResponses.add(orderDetailResponse);

        }
        return orderDetailResponses;
    }

}
