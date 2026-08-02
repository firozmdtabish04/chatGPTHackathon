package com.example.demo.service;

import java.io.IOException;
import java.util.Map;

import org.springframework.web.multipart.MultipartFile;

public interface OpenAIService {

	String transcribeAudio(MultipartFile audioFile) throws IOException;

	Map<String, Object> analyzeTranscript(String transcript);
}