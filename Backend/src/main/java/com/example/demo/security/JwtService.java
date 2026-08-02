package com.example.demo.security;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;

@Service
public class JwtService {

	@Value("${jwt.secret}")
	private String secret;

	@Value("${jwt.access-expiration}")
	private long accessExpiration;

	@Value("${jwt.refresh-expiration}")
	private long refreshExpiration;

	// ==========================
	// Access Token
	// ==========================

	public String generateAccessToken(String username) {
		return generateToken(username, accessExpiration);
	}

	// ==========================
	// Refresh Token
	// ==========================

	public String generateRefreshToken(String username) {
		return generateToken(username, refreshExpiration);
	}

	// ==========================
	// Common Token Generator
	// ==========================

	private String generateToken(String username, long expiration) {

		Map<String, Object> claims = new HashMap<>();

		return Jwts.builder().setClaims(claims).setSubject(username).setIssuedAt(new Date())
				.setExpiration(new Date(System.currentTimeMillis() + expiration))
				.signWith(getSigningKey(), SignatureAlgorithm.HS384).compact();
	}

	// ==========================
	// Username
	// ==========================

	public String extractUsername(String token) {
		return extractClaim(token, Claims::getSubject);
	}

	// ==========================
	// Expiration
	// ==========================

	public Date extractExpiration(String token) {
		return extractClaim(token, Claims::getExpiration);
	}

	// ==========================
	// Validate
	// ==========================

	public boolean isTokenValid(String token, UserDetails userDetails) {

		String username = extractUsername(token);

		return username.equals(userDetails.getUsername()) && !isTokenExpired(token);
	}

	// ==========================
	// Expired?
	// ==========================

	public boolean isTokenExpired(String token) {
		return extractExpiration(token).before(new Date());
	}

	// ==========================
	// Generic Claim
	// ==========================

	public <T> T extractClaim(String token, Function<Claims, T> resolver) {

		Claims claims = extractAllClaims(token);

		return resolver.apply(claims);
	}

	// ==========================
	// Claims
	// ==========================

	private Claims extractAllClaims(String token) {

		return Jwts.parserBuilder().setSigningKey(getSigningKey()).build().parseClaimsJws(token).getBody();
	}

	// ==========================
	// Secret Key
	// ==========================

	private Key getSigningKey() {

		byte[] keyBytes = Decoders.BASE64.decode(secret);

		return Keys.hmacShaKeyFor(keyBytes);
	}
}