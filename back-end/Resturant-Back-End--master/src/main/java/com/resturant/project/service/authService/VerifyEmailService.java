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
import com.resturant.project.service.emailSenderService.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import javax.mail.MessagingException;
import javax.transaction.Transactional;
import java.util.Date;
import java.util.UUID;

@Service
public class VerifyEmailService {
    @Autowired
    UserRepository userRepository;
    @Autowired
    private PasswordEncoder bcryptEncoder;
    @Autowired
    private JwtUtil jwtUtil;
    @Autowired
    private CustomUserDetailsService userDetailsService;

    private int otpExpirationInMs;
    @Autowired
    EmailService emailService;
    @Autowired
    private OTPRepository otpRepository;

    @Value("${otp.expirationDateInMs}")
    public void setOtpExpirationInMs(int OtpExpirationInMs) {
        this.otpExpirationInMs = OtpExpirationInMs;
    }

    public void sendEmailVerification(String email) throws MessagingException {
        OTP otp = otpRepository.findByEmail(email);
        if (otp == null)
            otp = new OTP();
        String uuid = UUID.randomUUID().toString();
        otp.setOtp(uuid);
        otp.setEmail(email);
        otp.setCreatedAt(new Date(System.currentTimeMillis()));
        otp.setExpiredDate(new Date(System.currentTimeMillis() + otpExpirationInMs));
        otp.setUsed(Using.EMAIL.name());
        String body = "http://localhost:3000/verifyEmail/" + uuid + ",Confirm Account";
        ;
        String subject = "Verify email Link";
        emailService.sendEmail(email, body, subject);
        otpRepository.save(otp);
    }

    @Transactional
    public String checkOtpValid(String otp,String choice) {
        OTP otp1 = otpRepository.findByOtp(otp);
        if (otp1 != null && otp1.getUsed().equals(Using.EMAIL.name())) {
            if(choice.equals("delete")) {
                otpRepository.delete(otp1);
                return "Done";
            }
            User user = userDetailsService.findUserByEmail(otp1.getEmail());
            user.setActive(true);
            userRepository.save(user);
            return otp1.getEmail();
        } else
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, HelperMessage.OTP_NOT_FOUND);

    }
    public AuthenticationResponse createPassword(UpdatePasswordRequest updatePasswordRequest) {
        User user = userDetailsService.findUserByEmail(updatePasswordRequest.getEmail());
        if (user != null) {
            checkOtpValid(updatePasswordRequest.getOtp(), "delete");
            user.setPassword(bcryptEncoder.encode(updatePasswordRequest.getPassword()));
            userRepository.save(user);
            String token = jwtUtil.generateToken(user);
            return new AuthenticationResponse(token);
        }
        throw new ResponseStatusException(HttpStatus.NOT_FOUND, HelperMessage.USER_NOT_FOUND);
    }


}
