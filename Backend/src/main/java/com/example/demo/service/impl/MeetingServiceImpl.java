package com.example.demo.service.impl;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.example.demo.entity.Meeting;
import com.example.demo.entity.MeetingSummary;
import com.example.demo.entity.Task;
import com.example.demo.entity.User;
import com.example.demo.enums.Priority;
import com.example.demo.enums.TaskStatus;
import com.example.demo.repository.MeetingRepository;
import com.example.demo.repository.TaskRepository;
import com.example.demo.repository.UserRepository;
import com.example.demo.service.MeetingService;
import com.example.demo.service.OpenAIService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class MeetingServiceImpl implements MeetingService {

	private final OpenAIService openAIService;
	private final MeetingRepository meetingRepository;
	private final UserRepository userRepository;
	private final TaskRepository taskRepository;

	@Transactional
	@Override
	public Meeting processMeetingAudio(MultipartFile file, String title, String organizerEmail) throws Exception {
		User organizer = userRepository.findByEmail(organizerEmail)
				.orElseThrow(() -> new RuntimeException("Organizer not found with email: " + organizerEmail));

		// Step 1: Speech to Text (Whisper)
		String transcript = openAIService.transcribeAudio(file);

		// Step 2: OpenAI Analysis
		Map<String, Object> aiResult = openAIService.analyzeTranscript(transcript);

		// Step 3: Create Meeting Entity
		Meeting meeting = Meeting.builder().title(title).transcript(transcript).organizer(organizer).build();

		// Step 4: Create Summary
		MeetingSummary summary = MeetingSummary.builder().executiveSummary((String) aiResult.get("executiveSummary"))
				.keyDecisions((String) aiResult.get("keyDecisions")).meeting(meeting).build();
		meeting.setSummary(summary);

		// Step 5: Save Meeting & Summary to MySQL
		Meeting savedMeeting = meetingRepository.save(meeting);

		// Step 6: Extract & Save Action Items / Tasks
		List<Map<String, String>> tasksData = (List<Map<String, String>>) aiResult.get("tasks");
		List<Task> tasksList = new ArrayList<>();

		if (tasksData != null) {
			for (Map<String, String> tData : tasksData) {
				String assigneeEmail = tData.get("assigneeEmail");
				User assignee = (assigneeEmail != null && !assigneeEmail.isBlank())
						? userRepository.findByEmail(assigneeEmail).orElse(organizer)
						: organizer;

				// Safe Enum Parsing for Priority (handles lowercase/uppercase string from
				// OpenAI)
				String rawPriority = tData.getOrDefault("priority", "MEDIUM");
				Priority priority;
				try {
					priority = Priority.valueOf(rawPriority.toUpperCase());
				} catch (IllegalArgumentException e) {
					priority = Priority.MEDIUM;
				}

				Task task = Task.builder().description(tData.get("description")).status(TaskStatus.PENDING)
						.priority(priority).dueDate(LocalDateTime.now().plusDays(3)) // Default 3-day deadline
						.assignedTo(assignee).meeting(savedMeeting).build();

				tasksList.add(taskRepository.save(task));
			}
		}

		savedMeeting.setTasks(tasksList);
		return savedMeeting;
	}
}