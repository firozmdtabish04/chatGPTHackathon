package com.example.demo.entity;

import java.time.LocalDateTime;

import com.example.demo.enums.Priority;
import com.example.demo.enums.TaskStatus;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "tasks")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Task {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	private String description;

	@Enumerated(EnumType.STRING)
	private TaskStatus status;

	@Enumerated(EnumType.STRING)
	private Priority priority;

	private LocalDateTime dueDate;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "assigned_user_id")
	@JsonIgnoreProperties({ "hibernateLazyInitializer", "handler" })
	private User assignedTo;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "meeting_id")
	@JsonIgnoreProperties("tasks") // Prevents circular JSON reference
	private Meeting meeting;
}