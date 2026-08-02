package com.example.demo.controller;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.enums.OtpPurpose;
import com.example.demo.service.OtpService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/otp")
@RequiredArgsConstructor
public class OtpController {

	private final OtpService otpService;

	// Send OTP
	@PostMapping("/send")
	public String sendOtp(@RequestParam String email) {

		otpService.sendOtp(email, OtpPurpose.REGISTER);

		return "OTP Sent Successfully";
	}

	// Verify OTP
	@PostMapping("/verify")
	public String verifyOtp(@RequestParam String email, @RequestParam String otp) {

		otpService.verifyOtp(email, otp, OtpPurpose.REGISTER);

		return "OTP Verified Successfully";
	}

	// Resend OTP
	@PostMapping("/resend")
	public String resendOtp(@RequestParam String email) {

		otpService.resendOtp(email, OtpPurpose.REGISTER);

		return "OTP Resent Successfully";
	}
}