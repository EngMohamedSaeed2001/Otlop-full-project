package com.resturant.project.model.requestBody;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.Email;

@Setter
@Getter
@Builder
public class AdminRequest {
    private String username;
    private String password;
    @Email
    private String email;
}
