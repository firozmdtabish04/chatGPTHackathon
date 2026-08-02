package com.example.demo.service.impl;

import java.security.SecureRandom;
import java.time.LocalDateTime;

import org.springframework.stereotype.Service;

import com.example.demo.entity.OtpVerification;
import com.example.demo.enums.OtpPurpose;
import com.example.demo.repository.OtpRepository;
import com.example.demo.service.EmailService;
import com.example.demo.service.OtpService;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class OtpServiceImpl implements OtpService {

	private final OtpRepository otpRepository;
	private final EmailService emailService;

	private final SecureRandom random = new SecureRandom();

	@Override
	@Transactional
	public void sendOtp(String email, OtpPurpose purpose) {

		otpRepository.deleteByEmail(email);

		String otp = generateOtp();

		OtpVerification verification = OtpVerification.builder().email(email).otp(otp).purpose(purpose).verified(false)
				.attempts(0).expiryTime(LocalDateTime.now().plusMinutes(5)).build();

		otpRepository.save(verification);

		emailService.sendOtpEmail(email, otp, purpose.name());
	}

	@Override
	public boolean verifyOtp(String email, String otp, OtpPurpose purpose) {

		OtpVerification verification = otpRepository.findTopByEmailAndPurposeOrderByCreatedAtDesc(email, purpose)
				.orElseThrow(() -> new RuntimeException("OTP not found"));

		if (verification.isVerified()) {
			throw new RuntimeException("OTP already used");
		}

		if (verification.getExpiryTime().isBefore(LocalDateTime.now())) {

			throw new RuntimeException("OTP expired");
		}

		if (verification.getAttempts() >= 5) {
			throw new RuntimeException("Maximum attempts exceeded");
		}

		verification.setAttempts(verification.getAttempts() + 1);

		if (!verification.getOtp().equals(otp)) {

			otpRepository.save(verification);

			throw new RuntimeException("Invalid OTP");
		}

		verification.setVerified(true);

		otpRepository.save(verification);

		return true;
	}

	@Override
	public void resendOtp(String email, OtpPurpose purpose) {

		sendOtp(email, purpose);
	}

	private String generateOtp() {

		int value = 100000 + random.nextInt(900000);

		return String.valueOf(value);
	}
}