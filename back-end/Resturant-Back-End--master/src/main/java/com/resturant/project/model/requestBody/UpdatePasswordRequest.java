package com.resturant.project.model.requestBody;

import lombok.Getter;

@Getter
public class UpdatePasswordRequest {
    private String email;
    private String password;
    private String otp;
}
