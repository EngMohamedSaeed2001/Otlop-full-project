package com.resturant.project.service;

import com.resturant.project.HelperMessage;
import com.resturant.project.model.RoleDTO;
import com.resturant.project.model.RoleResponse;
import com.resturant.project.model.entity.Role;
import com.resturant.project.repository.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class RoleService {

    @Autowired
    private RoleRepository roleRepository;

    public ResponseEntity<RoleResponse> createRole(RoleDTO roleDTO) {
       Role role1 = roleRepository.getRoleByName(roleDTO.getName());
       if(role1==null){
           Role role = Role.builder()
                   .name(roleDTO.getName())
                   .build();
           Role savedRole = roleRepository.save(role);
           return ResponseEntity.ok(RoleResponse.builder()
                   .id(savedRole.getId())
                   .name(savedRole.getName())
                   .build());
       }else
           throw new ResponseStatusException(HttpStatus.BAD_REQUEST, HelperMessage.ROLE_EXIST);
    }

    public List<Role> findRoles(List<Long> roleIds) {
        return roleRepository.findAllByIdIn(roleIds);
    }
}
