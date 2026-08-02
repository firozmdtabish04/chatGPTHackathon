package com.example.demo.controller;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.demo.entity.Meeting;
import com.example.demo.service.MeetingService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/meetings")
@RequiredArgsConstructor
public class MeetingController {

	private final MeetingService meetingService;

	@PostMapping(value = "/upload", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
	public ResponseEntity<Meeting> uploadMeetingAudio(

			@RequestPart("file") MultipartFile file,

			@RequestParam("title") String title,

			@AuthenticationPrincipal UserDetails userDetails)

			throws Exception {

		Meeting meeting = meetingService.processMeetingAudio(file, title, userDetails.getUsername());

		return ResponseEntity.ok(meeting);
	}

}