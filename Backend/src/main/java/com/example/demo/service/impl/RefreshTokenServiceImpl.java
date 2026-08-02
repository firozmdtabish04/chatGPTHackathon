package com.example.demo.service.impl;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.example.demo.entity.RefreshToken;
import com.example.demo.entity.User;
import com.example.demo.repository.RefreshTokenRepository;
import com.example.demo.service.RefreshTokenService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class RefreshTokenServiceImpl implements RefreshTokenService {

	private final RefreshTokenRepository repository;

	@Value("${jwt.refresh-expiration}")
	private long refreshExpiration;

	@Override
	public RefreshToken createRefreshToken(User user, String token, String deviceName, String deviceId,
			String ipAddress) {

		RefreshToken refreshToken = RefreshToken.builder().token(token)
				.expiryDate(LocalDateTime.now().plusSeconds(refreshExpiration / 1000)).revoked(false)
				.deviceName(deviceName).deviceId(deviceId).ipAddress(ipAddress).user(user).build();

		return repository.save(refreshToken);
	}

	@Override
	public RefreshToken verifyRefreshToken(String token) {

		RefreshToken refreshToken = repository.findByToken(token)
				.orElseThrow(() -> new RuntimeException("Refresh token not found"));

		if (refreshToken.isRevoked()) {
			throw new RuntimeException("Refresh token revoked");
		}

		if (refreshToken.getExpiryDate().isBefore(LocalDateTime.now())) {
			repository.delete(refreshToken);
			throw new RuntimeException("Refresh token expired");
		}

		return refreshToken;
	}

	@Override
	public void deleteRefreshToken(String token) {
		repository.deleteByToken(token);
	}

	@Override
	public void deleteAllUserTokens(User user) {
		repository.deleteByUser(user);
	}

	@Override
	public List<RefreshToken> getUserTokens(User user) {
		return repository.findByUser(user);
	}
}