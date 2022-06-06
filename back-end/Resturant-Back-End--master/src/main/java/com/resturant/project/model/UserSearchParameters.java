package com.resturant.project.model;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserSearchParameters {

    private String password;
    private String email;
}
