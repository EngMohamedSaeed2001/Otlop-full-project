package com.resturant.project.repository;

import com.resturant.project.model.entity.OTP;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OTPRepository extends JpaRepository<OTP,Long> {
    public OTP findByOtp(String otp);
    public OTP findByEmail(String email);
}
