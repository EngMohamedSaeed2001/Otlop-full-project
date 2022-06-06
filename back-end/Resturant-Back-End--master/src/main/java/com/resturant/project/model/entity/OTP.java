package com.resturant.project.model.entity;

import lombok.*;

import javax.persistence.*;
import java.util.Date;

@Setter
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class OTP {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Date createdAt;


    private Date expiredDate;

    private String otp;
    private String email;
    private String used;
}
