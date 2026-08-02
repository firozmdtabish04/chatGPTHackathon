package com.example.demo.service.impl;

import java.time.LocalDateTime;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.demo.dto.request.LoginRequest;
import com.example.demo.dto.request.RefreshTokenRequest;
import com.example.demo.dto.request.RegisterRequest;
import com.example.demo.dto.request.VerifyRegisterOtpRequest;
import com.example.demo.dto.response.AuthResponse;
import com.example.demo.entity.PendingRegistration;
import com.example.demo.entity.RefreshToken;
import com.example.demo.entity.User;
import com.example.demo.enums.OtpPurpose;
import com.example.demo.enums.RoleType;
import com.example.demo.repository.PendingRegistrationRepository;
import com.example.demo.repository.UserRepository;
import com.example.demo.security.JwtService;
import com.example.demo.service.AuthService;
import com.example.demo.service.OtpService;
import com.example.demo.service.RefreshTokenService;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

	private final UserRepository repository;
	private final PendingRegistrationRepository pendingRepository;

	private final OtpService otpService;
	private final PasswordEncoder passwordEncoder;

	private final JwtService jwtService;

	private final AuthenticationManager authenticationManager;

	private final RefreshTokenService refreshTokenService;

	@Override
	@Transactional
	public void register(RegisterRequest request) {

		if (repository.existsByEmail(request.getEmail())) {
			throw new RuntimeException("Email already registered");
		}

		pendingRepository.deleteByEmail(request.getEmail());

		PendingRegistration pending = PendingRegistration.builder().fullName(request.getFullName())
				.email(request.getEmail()).password(passwordEncoder.encode(request.getPassword()))
				.expiryTime(LocalDateTime.now().plusMinutes(10)).build();

		pendingRepository.save(pending);

		otpService.sendOtp(request.getEmail(), OtpPurpose.REGISTER);
	}

	@Override
	public AuthResponse login(LoginRequest request, HttpServletRequest httpRequest) {

		authenticationManager
				.authenticate(new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));

		User user = repository.findByEmail(request.getEmail())
				.orElseThrow(() -> new RuntimeException("User not found"));

		String accessToken = jwtService.generateAccessToken(user.getEmail());

		String refreshToken = jwtService.generateRefreshToken(user.getEmail());

		refreshTokenService.createRefreshToken(user, refreshToken, httpRequest.getHeader("User-Agent"),
				httpRequest.getSession().getId(), httpRequest.getRemoteAddr());

		return AuthResponse.builder().accessToken(accessToken).refreshToken(refreshToken).email(user.getEmail())
				.fullName(user.getFullName()).role(user.getRole().name()).expiresIn(3600).build();
	}

	@Override
	public AuthResponse refreshToken(RefreshTokenRequest request) {

		RefreshToken refreshToken = refreshTokenService.verifyRefreshToken(request.getRefreshToken());

		User user = refreshToken.getUser();

		String accessToken = jwtService.generateAccessToken(user.getEmail());

		return AuthResponse.builder().accessToken(accessToken).refreshToken(refreshToken.getToken())
				.email(user.getEmail()).fullName(user.getFullName()).role(user.getRole().name()).expiresIn(3600)
				.build();
	}

	@Override
	@Transactional
	public AuthResponse verifyRegistrationOtp(VerifyRegisterOtpRequest request) {

		otpService.verifyOtp(request.getEmail(), request.getOtp(), OtpPurpose.REGISTER);

		PendingRegistration pending = pendingRepository.findByEmail(request.getEmail())
				.orElseThrow(() -> new RuntimeException("Registration expired"));

		User user = User.builder().fullName(pending.getFullName()).email(pending.getEmail())
				.password(pending.getPassword()).role(RoleType.ROLE_USER).enabled(true).build();

		repository.save(user);

		pendingRepository.delete(pending);

		String accessToken = jwtService.generateAccessToken(user.getEmail());

		String refreshToken = jwtService.generateRefreshToken(user.getEmail());

		refreshTokenService.createRefreshToken(user, refreshToken, "Registration", "Unknown", "127.0.0.1");

		return AuthResponse.builder().accessToken(accessToken).refreshToken(refreshToken).email(user.getEmail())
				.fullName(user.getFullName()).role(user.getRole().name()).expiresIn(3600).build();
	}

	@Override
	public void logout(RefreshTokenRequest request) {

		refreshTokenService.deleteRefreshToken(request.getRefreshToken());

	}

	@Override
	public void logoutAll(String email) {

		User user = repository.findByEmail(email).orElseThrow(() -> new RuntimeException("User not found"));

		refreshTokenService.deleteAllUserTokens(user);

	}
}
