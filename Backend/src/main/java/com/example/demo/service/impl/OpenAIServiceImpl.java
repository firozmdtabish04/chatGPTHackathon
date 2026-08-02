package com.example.demo.service.impl;

import java.io.IOException;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.MediaType;
import org.springframework.http.client.MultipartBodyBuilder;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;
import org.springframework.web.multipart.MultipartFile;

import com.example.demo.service.OpenAIService;
import com.fasterxml.jackson.databind.ObjectMapper;

@Service
public class OpenAIServiceImpl implements OpenAIService {

	@Value("${spring.ai.openai.api-key}")
	private String apiKey;
	private final RestClient restClient = RestClient.builder().build();
	private final ObjectMapper objectMapper = new ObjectMapper();

	// 1. Speech-to-Text using OpenAI Whisper API
	@Override
	public String transcribeAudio(MultipartFile audioFile) throws IOException {
		MultipartBodyBuilder bodyBuilder = new MultipartBodyBuilder();
		bodyBuilder.part("model", "whisper-1");
		bodyBuilder.part("file", new ByteArrayResource(audioFile.getBytes()) {
			@Override
			public String getFilename() {
				return audioFile.getOriginalFilename();
			}
		});

		Map response = restClient.post().uri("https://api.openai.com/v1/audio/transcriptions")
				.header("Authorization", "Bearer " + apiKey).contentType(MediaType.MULTIPART_FORM_DATA)
				.body(bodyBuilder.build()).retrieve().body(Map.class);

		return (String) response.get("text");
	}

	// 2. Extract Executive Summary, Key Decisions, and Tasks using GPT-4o
	@Override
	public Map<String, Object> analyzeTranscript(String transcript) {
		String systemPrompt = """
				You are an AI meeting assistant. Analyze the transcript provided.
				Return a JSON object containing:
				- "executiveSummary": string
				- "keyDecisions": string
				- "tasks": list of objects [{ "description": string, "priority": "HIGH/MEDIUM/LOW", "assigneeEmail": string }]
				""";

		Map<String, Object> requestBody = Map.of("model", "gpt-4o", "response_format", Map.of("type", "json_object"),
				"messages", List.of(Map.of("role", "system", "content", systemPrompt),
						Map.of("role", "user", "content", transcript)));

		Map response = restClient.post().uri("https://api.openai.com/v1/chat/completions")
				.header("Authorization", "Bearer " + apiKey).contentType(MediaType.APPLICATION_JSON).body(requestBody)
				.retrieve().body(Map.class);

		try {
			List choices = (List) response.get("choices");
			Map firstChoice = (Map) choices.get(0);
			Map message = (Map) firstChoice.get("message");
			String contentJson = (String) message.get("content");

			return objectMapper.readValue(contentJson, Map.class);
		} catch (Exception e) {
			throw new RuntimeException("Failed to parse OpenAI JSON response", e);
		}
	}
}
