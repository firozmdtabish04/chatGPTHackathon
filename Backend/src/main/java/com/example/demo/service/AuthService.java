package com.example.demo.service;

import com.example.demo.dto.request.LoginRequest;
import com.example.demo.dto.request.RefreshTokenRequest;
import com.example.demo.dto.request.RegisterRequest;
import com.example.demo.dto.request.VerifyRegisterOtpRequest;
import com.example.demo.dto.response.AuthResponse;

import jakarta.servlet.http.HttpServletRequest;

public interface AuthService {

	AuthResponse login(LoginRequest request, HttpServletRequest requestContext);

	AuthResponse refreshToken(RefreshTokenRequest request);

	void logout(RefreshTokenRequest request);

	void logoutAll(String email);

	void register(RegisterRequest request);

	AuthResponse verifyRegistrationOtp(VerifyRegisterOtpRequest request);

}