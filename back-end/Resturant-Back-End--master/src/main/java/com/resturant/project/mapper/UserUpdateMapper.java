package com.resturant.project.mapper;

import com.resturant.project.model.UserUpdate;
import com.resturant.project.model.entity.User;
import com.resturant.project.repository.MainProfileRepository;
import lombok.Getter;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.Objects;

@Component
@Setter
@Getter
public class UserUpdateMapper {
    @Autowired
    private PasswordEncoder bcryptEncoder;

    @Autowired
    MainProfileRepository profileRepository;

    public void mapTo(UserUpdate userDetailsDTO, User user) {

        if (userDetailsDTO.getUsername() != null) {
            user.setUsername(userDetailsDTO.getUsername());
        }
        if (userDetailsDTO.getPassword() != null) {
            user.setPassword(bcryptEncoder.encode(userDetailsDTO.getPassword()));
        }
        if (userDetailsDTO.getImg() != null) {
            user.setImg(userDetailsDTO.getImg());
        }
        if (userDetailsDTO.getNewEmail() != null) {
            user.setEmail(userDetailsDTO.getNewEmail());
        }
        if (userDetailsDTO.getProfileId() != null) {
            user.setProfile(profileRepository.getById(userDetailsDTO.getProfileId()));
        }
        if (userDetailsDTO.getPhone() != null) {
            if (!Objects.equals(userDetailsDTO.getPhone(), "0"))
                user.setPhone(userDetailsDTO.getPhone());
        }
    }
}
