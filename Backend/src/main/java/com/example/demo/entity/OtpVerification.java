package com.example.demo.entity;

import java.time.LocalDateTime;

import com.example.demo.enums.OtpPurpose;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "otp_verifications")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class OtpVerification extends BaseEntity {

	@Column(nullable = false)
	private String email;

	@Column(nullable = false, length = 6)
	private String otp;

	@Enumerated(EnumType.STRING)
	@Column(nullable = false)
	private OtpPurpose purpose;

	@Column(nullable = false)
	private LocalDateTime expiryTime;

	@Builder.Default
	private boolean verified = false;

	@Builder.Default
	private int attempts = 0;
}