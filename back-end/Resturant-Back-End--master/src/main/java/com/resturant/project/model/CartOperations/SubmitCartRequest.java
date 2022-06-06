package com.resturant.project.model.CartOperations;

import com.resturant.project.model.entity.OrderItem;
import lombok.*;

import javax.validation.constraints.Size;
import java.util.List;

@Setter
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class SubmitCartRequest {
    private String userEmail;

    private List<String > ItemName;
    @Size(min = 11,max = 11)
    private String phone;
    private String address;
}
