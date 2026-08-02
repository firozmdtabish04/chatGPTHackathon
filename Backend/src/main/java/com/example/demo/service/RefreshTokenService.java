package com.example.demo.service;

import java.util.List;

import com.example.demo.entity.RefreshToken;
import com.example.demo.entity.User;

public interface RefreshTokenService {

	RefreshToken createRefreshToken(User user, String token, String deviceName, String deviceId, String ipAddress);

	RefreshToken verifyRefreshToken(String token);

	void deleteRefreshToken(String token);

	void deleteAllUserTokens(User user);

	List<RefreshToken> getUserTokens(User user);
}