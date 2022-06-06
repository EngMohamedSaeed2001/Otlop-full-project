package com.resturant.project.controller.verifyEmailController;

import com.resturant.project.model.AuthenticationResponse;
import com.resturant.project.model.requestBody.UpdatePasswordRequest;
import com.resturant.project.service.authService.VerifyEmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController


public class VerifyEmailController {
    @Autowired
    VerifyEmailService verifyEmailService;

    @PostMapping(value = "/verifyEmail/{otp}")
    public String verifyEmail(@PathVariable String otp) {
        return verifyEmailService.checkOtpValid(otp,"wait");
    }
    @PostMapping(value = "/createPassword")
    public AuthenticationResponse createPassword(@RequestBody UpdatePasswordRequest updatePasswordRequest) {
        return verifyEmailService.createPassword(updatePasswordRequest);
    }

}
