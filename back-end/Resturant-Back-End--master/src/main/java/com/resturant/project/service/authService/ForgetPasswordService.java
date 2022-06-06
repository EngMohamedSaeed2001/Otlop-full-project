package com.resturant.project.service.authService;

import com.resturant.project.HelperMessage;
import com.resturant.project.jwt.JwtUtil;
import com.resturant.project.model.AuthenticationResponse;
import com.resturant.project.model.entity.OTP;
import com.resturant.project.model.entity.User;
import com.resturant.project.model.enums.Using;
import com.resturant.project.model.requestBody.UpdatePasswordRequest;
import com.resturant.project.repository.OTPRepository;
import com.resturant.project.repository.UserRepository;
import com.resturant.project.service.CustomUserDetailsService;
import com.resturant.project.service.emailSenderService.EmailSenderService;
import com.resturant.project.service.emailSenderService.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import javax.mail.MessagingException;
import java.util.Date;
import java.util.UUID;

@Service
public class ForgetPasswordService {
    @Autowired
    private PasswordEncoder bcryptEncoder;

    @Autowired
    UserRepository userRepository;
    @Autowired
    private CustomUserDetailsService userDetailsService;

    private int otpExpirationInMs;
    @Autowired
    private OTPRepository otpRepository;
    @Autowired
    EmailService emailService;
    @Autowired
    private JwtUtil jwtUtil;


    @Value("${otp.expirationDateInMs}")
    public void setOtpExpirationInMs(int OtpExpirationInMs) {
        this.otpExpirationInMs = OtpExpirationInMs;
    }

    public void forgetPassword(String email) throws MessagingException {
        userDetailsService.findUserByEmail(email);
        OTP otp = otpRepository.findByEmail(email);
        if (otp == null)
            otp = new OTP();
        String uuid = UUID.randomUUID().toString();
        otp.setOtp(uuid);
        otp.setEmail(email);
        otp.setUsed(Using.PASSWORD.name());
        otp.setCreatedAt(new Date(System.currentTimeMillis()));
        otp.setExpiredDate(new Date(System.currentTimeMillis() + otpExpirationInMs));
        String body = "http://localhost:3000/forgetPassword/" + uuid+",Change password";
        String subject = "Forget password Link";
        emailService.sendEmail(email,body,subject);
        otpRepository.save(otp);
        throw new ResponseStatusException(HttpStatus.CREATED, HelperMessage.FORGET_PASSWORD_REQUEST);
    }

    public void checkOtp(String otp, String choice) {
        OTP otp1 = otpRepository.findByOtp(otp);
        if (otp1 != null && otp1.getUsed().equals(Using.PASSWORD.name())) {
            if (otp1.getExpiredDate().getTime() - System.currentTimeMillis() > 0) {
                if (choice.equals("delete"))
                    otpRepository.delete(otp1);
            } else {
                otpRepository.delete(otp1);
                throw new ResponseStatusException(HttpStatus.EXPECTATION_FAILED, HelperMessage.OTP_EXPIRE);
            }
        } else
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, HelperMessage.OTP_NOT_FOUND);

    }

    public AuthenticationResponse updatePassword(UpdatePasswordRequest updatePasswordRequest) {
        User user = userDetailsService.findUserByEmail(updatePasswordRequest.getEmail());
        if (user != null) {
            checkOtp(updatePasswordRequest.getOtp(), "delete");
            user.setPassword(bcryptEncoder.encode(updatePasswordRequest.getPassword()));
            userRepository.save(user);
            String token = jwtUtil.generateToken(user);
            return new AuthenticationResponse(token);
        }
        throw new ResponseStatusException(HttpStatus.NOT_FOUND, HelperMessage.USER_NOT_FOUND);
    }

}






