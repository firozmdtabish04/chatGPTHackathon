package com.example.demo.scheduler;

import java.util.List;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import com.example.demo.entity.Task;
import com.example.demo.entity.User;
import com.example.demo.enums.TaskStatus;
import com.example.demo.repository.TaskRepository;
import com.example.demo.service.EmailService;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class ReminderScheduler {

	private final TaskRepository taskRepository;
	private final EmailService emailService;

	// Runs every day at 8:00 AM
	@Scheduled(cron = "0 0 8 * * ?")
	public void sendPendingTaskReminders() {

		List<Task> pendingTasks = taskRepository.findByStatus(TaskStatus.PENDING);

		for (Task task : pendingTasks) {

			User assignee = task.getAssignedTo();

			if (assignee == null) {
				continue;
			}

			String email = assignee.getEmail();

			String userName = (assignee.getFullName() != null && !assignee.getFullName().isBlank())
					? assignee.getFullName()
					: email;

			String meetingTitle = task.getMeeting() != null ? task.getMeeting().getTitle() : "General Meeting";

			String subject = "MeetMind AI - Task Reminder";

			String body = String.format("""
					Hello %s,

					You have an outstanding action item from meeting "%s".

					Task      : %s
					Priority  : %s
					Due Date  : %s

					Please complete it as soon as possible.

					Regards,
					MeetMind AI
					""", userName, meetingTitle, task.getDescription(), task.getPriority(), task.getDueDate());

			emailService.sendSimpleEmail(email, subject, body);
		}
	}
}