package com.resturant.project.model.entity;

import lombok.*;

import javax.persistence.*;
import java.util.Date;
import java.util.List;
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
public class OrderDetail {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    private String  soledItems ;

    private String userEmail ;
    private double orderPrice;
    private String phone;
    private String address;

    private Date orderTime ;

}
