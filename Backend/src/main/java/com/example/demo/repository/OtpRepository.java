package com.example.demo.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.entity.OtpVerification;
import com.example.demo.enums.OtpPurpose;

public interface OtpRepository extends JpaRepository<OtpVerification, Long> {

	Optional<OtpVerification> findTopByEmailAndPurposeOrderByCreatedAtDesc(String email, OtpPurpose purpose);

	void deleteByEmail(String email);
}