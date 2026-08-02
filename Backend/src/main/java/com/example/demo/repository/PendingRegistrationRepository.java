package com.example.demo.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.entity.PendingRegistration;

public interface PendingRegistrationRepository extends JpaRepository<PendingRegistration, Long> {

	Optional<PendingRegistration> findByEmail(String email);

	void deleteByEmail(String email);

}