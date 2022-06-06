package com.resturant.project.service.AdminServices;

import com.resturant.project.HelperMessage;
import com.resturant.project.mapper.AdminMapper;
import com.resturant.project.mapper.UserDetailsMapper;
import com.resturant.project.model.UserDetailsDto;
import com.resturant.project.model.entity.ContactUs;
import com.resturant.project.model.entity.Profile;
import com.resturant.project.model.entity.User;
import com.resturant.project.model.enums.Profiles;
import com.resturant.project.model.enums.Roles;
import com.resturant.project.model.requestBody.AdminRequest;
import com.resturant.project.repository.ContactRepository;
import com.resturant.project.repository.MainProfileRepository;
import com.resturant.project.repository.UserRepository;
import com.resturant.project.validation.UserDetailsValidator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;

@Service
public class AdminServices {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    AdminMapper adminMapper;
    @Autowired
    UserDetailsMapper userDetailsMapper;
    @Autowired
    MainProfileRepository profileRepository;

    @Autowired
    ContactRepository contactRepository;
    @Autowired
    UserDetailsValidator userDetailsValidator;


    public List<ContactUs> getAllContactUs(){
        return contactRepository.findAll();
    }
    public void suspendUser(String email){
        Optional<User> user = userRepository.findByEmail(email);
        if(user.isPresent()) {
            user.get().setSuspended(true);
            userRepository.save(user.get());
        }else
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, HelperMessage.USER_NOT_FOUND);
    }

    public User addUser(UserDetailsDto userDetailsDto){
        userDetailsValidator.validate(userDetailsDto.getEmail());
        User user = new User();
        userDetailsMapper.mapTo(userDetailsDto,user);
        user.setActive(true);
        return userRepository.save(user);
    }
    public void unSuspendUser(String email){
        Optional<User> user = userRepository.findByEmail(email);
        if(user.isPresent()) {
            user.get().setSuspended(false);
            userRepository.save(user.get());
        }else
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, HelperMessage.USER_NOT_FOUND);
    }

    public void upgradeToAdmin(String  email){
        Optional<User> user = userRepository.findByEmail(email);
        if(user.isPresent()){
            Profile profile = profileRepository.findProfileByName(Profiles.Admin.name());
            user.get().setProfile(profile);
            userRepository.save(user.get());
            throw new ResponseStatusException(HttpStatus.OK,HelperMessage.USER_UPGRADED);
        }else
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,HelperMessage.USER_NOT_FOUND);

    }
    public void unUpgrade(String  email){
        Optional<User> user = userRepository.findByEmail(email);
        if(user.isPresent()){
            Profile profile = profileRepository.findProfileByName(Profiles.User.name());
            user.get().setProfile(profile);
            userRepository.save(user.get());
            throw new ResponseStatusException(HttpStatus.OK,HelperMessage.USER_UN_UPGRADED);
        }else
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,HelperMessage.USER_NOT_FOUND);

    }
       public List<User> getAllUsers(){
        return userRepository.findAll();
    }

}
