package com.example.demo.entity;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "pending_registrations")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PendingRegistration extends BaseEntity {

	@Column(nullable = false)
	private String fullName;

	@Column(nullable = false, unique = true)
	private String email;

	@Column(nullable = false)
	private String password;

	@Column(nullable = false)
	private LocalDateTime expiryTime;

}