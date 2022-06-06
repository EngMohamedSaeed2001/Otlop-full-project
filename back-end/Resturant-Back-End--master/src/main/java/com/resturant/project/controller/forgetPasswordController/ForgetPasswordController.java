package com.resturant.project.controller.forgetPasswordController;

import com.resturant.project.model.AuthenticationResponse;
import com.resturant.project.model.requestBody.EmailRequest;
import com.resturant.project.model.requestBody.OtpRequest;
import com.resturant.project.model.requestBody.UpdatePasswordRequest;
import com.resturant.project.service.authService.ForgetPasswordService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import javax.mail.MessagingException;

@RestController


public class ForgetPasswordController {

    @Autowired
    private ForgetPasswordService forgetPasswordService;

    @PostMapping(value = "/forgetPassword")
    public void forgetPassword(@RequestBody EmailRequest email) throws MessagingException {
         forgetPasswordService.forgetPassword(email.getEmail());
    }

    @PostMapping(value = "/checkOtp")
    public void checkOtp(@RequestBody OtpRequest otp) {
        forgetPasswordService.checkOtp(otp.getOtp(),"check");
    }
    @PostMapping(value = "/updatePassword")
    public AuthenticationResponse updatePassword(@RequestBody UpdatePasswordRequest updatePasswordRequest) {
        return forgetPasswordService.updatePassword(updatePasswordRequest);
    }


}
