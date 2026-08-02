package com.example.demo.service.impl;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import com.example.demo.service.EmailService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class EmailServiceImpl implements EmailService {

	private final JavaMailSender mailSender;
	@Value("${spring.mail.username}")
	private String fromEmail;

	@Override
	public void sendSimpleEmail(String to, String subject, String body) {

		SimpleMailMessage message = new SimpleMailMessage();

		message.setTo(to);
		message.setSubject(subject);
		message.setText(body);

		mailSender.send(message);
	}

	@Override
	public void sendOtpEmail(String to, String otp, String purpose) {

		SimpleMailMessage message = new SimpleMailMessage();

		message.setFrom(fromEmail);
		message.setTo(to);
		message.setSubject("MeetMind AI - " + purpose + " OTP Verification");

		message.setText("""
				Hello,

				Your One-Time Password (OTP) for %s is:

				%s

				This OTP is valid for 5 minutes.

				Regards,
				MeetMind AI Team
				""".formatted(purpose, otp));

		mailSender.send(message);
	}
}