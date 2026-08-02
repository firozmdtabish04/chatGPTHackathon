package com.example.demo.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "meeting_summaries")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MeetingSummary {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(columnDefinition = "TEXT")
	private String executiveSummary;

	@Column(columnDefinition = "TEXT")
	private String keyDecisions;

	@OneToOne
	@JoinColumn(name = "meeting_id")
	@JsonIgnoreProperties("summary") // Prevents circular JSON reference
	private Meeting meeting;
}