package com.resturant.project.model.entity;

import lombok.*;

import javax.persistence.*;

@Entity
@Setter
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class OrderItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "order_id", nullable = false)
    private Long id;
    private String itemName;
    private String des;
    private String img;
    private double price;
    private long fats;
    private long calories;
    private long size;
    private long quantity;
    private String email;
}
