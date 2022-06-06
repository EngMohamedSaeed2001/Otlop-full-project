package com.resturant.project.model.requestBody;

import lombok.*;

import javax.validation.constraints.Email;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class OrderItemReq {
    @Email
    private String email ;
    private String ItemName ;
}
