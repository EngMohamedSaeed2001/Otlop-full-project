package com.resturant.project.model.entity;

import lombok.*;

import javax.persistence.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
public class Item {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;
    @Column(unique = true)
    private String itemName;
    private String des;
    private String img;
    private double price;
    private long fats;
    private long calories;
    private long size;
    private String categoryName;
}
