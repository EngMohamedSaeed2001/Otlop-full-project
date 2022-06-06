package com.resturant.project.service;

import com.resturant.project.HelperMessage;
import com.resturant.project.mapper.UserDetailsMapper;
import com.resturant.project.mapper.UserUpdateMapper;
import com.resturant.project.model.AuthenticationRequest;
import com.resturant.project.model.UserDetailsDto;
import com.resturant.project.model.UserSearchParameters;
import com.resturant.project.model.UserUpdate;
import com.resturant.project.model.entity.Cart;
import com.resturant.project.model.entity.Role;
import com.resturant.project.model.entity.User;
import com.resturant.project.repository.CartRepo;
import com.resturant.project.repository.UserRepository;
import com.resturant.project.repository.specification.UserSpecifications;
import com.resturant.project.service.authService.VerifyEmailService;
import com.resturant.project.validation.UserDetailsValidator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import javax.mail.MessagingException;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserDetailsMapper userDetailsMapper;
    @Autowired
    private UserUpdateMapper userUpdateMapper;

    @Autowired
    private UserDetailsValidator userDetailsValidator;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private CartRepo cartRepo;

    @Autowired
    VerifyEmailService verifyEmailService;




    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        List<SimpleGrantedAuthority> roles = new ArrayList<>();
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with the name " + username));

        for (Role role : user.getProfile().getRoles()) {
            roles.add(new SimpleGrantedAuthority(role.getName()));
        }
        return new org.springframework.security.core.userdetails.User(user.getUsername(), user.getPassword(), roles);
    }

    public User createUser(UserDetailsDto userDetailsDTO) throws MessagingException {

        User user = new User();
        userDetailsMapper.mapTo(userDetailsDTO, user);

        Cart cart = cartRepo.findCartByUserEmail(userDetailsDTO.getEmail());
        if(cart==null){
            cartRepo.save(Cart.builder()
                    .userEmail(userDetailsDTO.getEmail())
                    .orders(new ArrayList<>())
                    .build()
            );
        }
        if(!userDetailsDTO.isSocial()){
            userDetailsValidator.validate(userDetailsDTO.getEmail());
            verifyEmailService.sendEmailVerification(userDetailsDTO.getEmail());
            userRepository.save(user);
            throw new ResponseStatusException(HttpStatus.CREATED, HelperMessage.EMAIL_CREATED);
        }else{
            Optional<User> user1 = userRepository.findByEmail(userDetailsDTO.getEmail());
            if(user1.isPresent()){
                user.setId(user1.get().getId());
                return user;
            }else
                return userRepository.save(user);
        }
    }

    public UserDetailsDto updateUserByEmail(UserUpdate userUpdate) {

        User existUser = findUserByEmail(userUpdate.getOldEmail());
        userUpdateMapper.mapTo(userUpdate, existUser);
        User updatedUser = userRepository.save(existUser);

        return userDetailsMapper.mapTo(updatedUser);
    }

    public User findUserByEmail(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, HelperMessage.USER_NOT_FOUND));
    }

    public User findUser(AuthenticationRequest authenticationRequest) {
        if(authenticationRequest.getSocial())
            return userRepository.findByEmail(authenticationRequest.getEmail())
                    .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, HelperMessage.USER_NOT_FOUND));


        UserSearchParameters userSearchParameters = userDetailsMapper.mapTo(authenticationRequest);

        UserSpecifications userSpecifications = UserSpecifications.builder()
                .userSearchParameters(userSearchParameters)
                .build();

        return userRepository.findAll(userSpecifications).stream()
                .filter(filterdUser -> passwordEncoder.matches(userSearchParameters.getPassword(), filterdUser.getPassword()))
                .findFirst()
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, HelperMessage.USER_NOT_FOUND));
    }
}
