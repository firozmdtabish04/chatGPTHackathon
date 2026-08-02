package com.example.demo.service;

import org.springframework.web.multipart.MultipartFile;

import com.example.demo.entity.Meeting;

public interface MeetingService {

	Meeting processMeetingAudio(MultipartFile file, String title, String organizerEmail) throws Exception;
}