package com.example.demo.exception;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.MailAuthenticationException;
import org.springframework.mail.MailException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.example.demo.dto.response.ApiResponse;

@RestControllerAdvice
public class GlobalExceptionHandler {

	private static final Logger log = LoggerFactory.getLogger(GlobalExceptionHandler.class);

	@ExceptionHandler(DuplicateResourceException.class)
	public ResponseEntity<ApiResponse<Object>> duplicate(DuplicateResourceException ex) {

		return ResponseEntity.badRequest()
				.body(ApiResponse.builder().success(false).message(ex.getMessage()).data(null).build());
	}

	@ExceptionHandler(ResourceNotFoundException.class)
	public ResponseEntity<ApiResponse<Object>> notFound(ResourceNotFoundException ex) {

		return ResponseEntity.status(HttpStatus.NOT_FOUND)
				.body(ApiResponse.builder().success(false).message(ex.getMessage()).data(null).build());
	}

	@ExceptionHandler(MailAuthenticationException.class)
	public ResponseEntity<ApiResponse<Object>> mailAuthentication(MailAuthenticationException ex) {

		log.error("Mail Authentication Error", ex);

		return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
				.body(ApiResponse.builder().success(false)
						.message("Gmail authentication failed. Please verify your App Password.").data(getRootCause(ex))
						.build());
	}

	@ExceptionHandler(MailException.class)
	public ResponseEntity<ApiResponse<Object>> mailException(MailException ex) {

		log.error("Mail Error", ex);

		return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(
				ApiResponse.builder().success(false).message("Unable to send email.").data(getRootCause(ex)).build());
	}

	@ExceptionHandler(Exception.class)
	public ResponseEntity<ApiResponse<Object>> generic(Exception ex) {

		log.error("Unhandled Exception", ex);

		return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
				.body(ApiResponse.builder().success(false).message(ex.getMessage()).data(getRootCause(ex)).build());
	}

	private String getRootCause(Throwable throwable) {

		Throwable root = throwable;

		while (root.getCause() != null) {
			root = root.getCause();
		}

		return root.getClass().getSimpleName() + " : " + root.getMessage();
	}
}