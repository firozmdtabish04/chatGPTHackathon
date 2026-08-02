package com.example.demo.service;

public interface EmailService {

	void sendSimpleEmail(String to, String subject, String body);

	void sendOtpEmail(String to, String otp, String purpose);

}