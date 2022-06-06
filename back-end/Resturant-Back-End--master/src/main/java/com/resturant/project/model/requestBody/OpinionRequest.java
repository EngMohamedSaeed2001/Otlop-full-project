package com.resturant.project.model.requestBody;

import lombok.*;

import javax.validation.constraints.Email;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder

public class OpinionRequest {
    private String opinion ;
    @Email
    private String userEmail ;
    private double rate ;
}
