package com.resturant.project.mapper;

import com.resturant.project.model.UserDetailsDto;
import com.resturant.project.model.entity.Profile;
import com.resturant.project.model.entity.User;
import com.resturant.project.model.enums.Profiles;
import com.resturant.project.model.requestBody.AdminRequest;
import com.resturant.project.repository.MainProfileRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class AdminMapper {
    @Autowired
    private PasswordEncoder bcryptEncoder;

    @Autowired
    MainProfileRepository profileRepository;
    public void mapTo(AdminRequest adminRequest, User user) {

        if (adminRequest.getUsername() != null) {
            user.setUsername(adminRequest.getUsername());
        }
        if (adminRequest.getPassword() != null) {
            user.setPassword(bcryptEncoder.encode(adminRequest.getPassword()));
        }
        if (adminRequest.getEmail() != null) {
            user.setEmail(adminRequest.getEmail());
        }

        Profile profile = profileRepository.findProfileByName(Profiles.Admin.name());
        user.setProfile(profile);
    }
}
