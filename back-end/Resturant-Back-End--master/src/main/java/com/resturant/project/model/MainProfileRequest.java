package com.resturant.project.model;

import lombok.*;

import javax.validation.Valid;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.util.List;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MainProfileRequest {
    @NotBlank
    private String name;
    @NotNull
    private List<Long> rolesIds;
}
