package com.example.demo.service;

import com.example.demo.enums.OtpPurpose;

public interface OtpService {

	void sendOtp(String email, OtpPurpose purpose);

	boolean verifyOtp(String email, String otp, OtpPurpose purpose);

	void resendOtp(String email, OtpPurpose purpose);

}