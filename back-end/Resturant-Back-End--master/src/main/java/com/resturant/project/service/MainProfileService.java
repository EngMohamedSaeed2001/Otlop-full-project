package com.resturant.project.service;

import com.resturant.project.HelperMessage;
import com.resturant.project.model.MainProfileRequest;
import com.resturant.project.model.ProfileResponse;
import com.resturant.project.model.RoleDTO;
import com.resturant.project.model.entity.Profile;
import com.resturant.project.model.entity.Role;
import com.resturant.project.repository.MainProfileRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class MainProfileService {

    @Autowired
    private MainProfileRepository profileRepository;

    @Autowired
    private RoleService roleService;


    public ProfileResponse createProfile(MainProfileRequest profileRequest) {

        List<Role> existedRoles = roleService.findRoles(profileRequest.getRolesIds());

        Profile profile = Profile.builder()
                .name(profileRequest.getName())
                .roles(existedRoles)
                .build();

        Profile savedProfile = profileRepository.save(profile);
        return ProfileResponse.builder()
                .id(savedProfile.getId())
                .name(savedProfile.getName())
                .roles(savedProfile.getRoles().stream().map(role -> RoleDTO.builder().name(role.getName()).build())
                        .collect(Collectors.toList()))
                .build();
    }

    public ProfileResponse updateProfile(Long profileId, MainProfileRequest profileRequest) {

        List<Role> existedRoles = roleService.findRoles(profileRequest.getRolesIds());

        Profile profile = profileRepository.findById(profileId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND,
                        String.format("profile with id: %s, not exist", profileId)));

        profile.setName(profileRequest.getName());
        profile.setRoles(existedRoles);

        Profile savedProfile = profileRepository.save(profile);
        return ProfileResponse.builder()
                .id(savedProfile.getId())
                .name(savedProfile.getName())
                .roles(savedProfile.getRoles().stream().map(role -> RoleDTO.builder().name(role.getName()).build())
                        .collect(Collectors.toList()))
                .build();
    }

    public Profile findProfile(Long profileId) {
        return profileRepository.findById(profileId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, HelperMessage.PROFILE_NOT_FOUND));
    }
}
