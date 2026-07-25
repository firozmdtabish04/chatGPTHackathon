MeetMind AI

MeetMind AI is an AI-powered meeting management platform that automatically converts meeting audio into text, generates intelligent summaries, extracts action items, assigns task owners, schedules reminders, and sends email notifications. It helps teams save time by automating meeting documentation and follow-ups using AI.

🚀 Features
🔐 Authentication & Security
JWT Authentication
Role-Based Authorization (Admin, User)
Secure Password Encryption (BCrypt)
Spring Security
Refresh Token Support (Optional)
👤 User Management
User Registration & Login
Profile Management
Role Management
Account Settings
🎙 AI Meeting Assistant
Upload Meeting Audio
Speech-to-Text Conversion
AI Generated Meeting Summary
AI Generated Action Items
Owner Assignment
Meeting History
✅ Task Management
Create Tasks
Update Task Status
Priority Management
Due Dates
Task Assignment
⏰ Reminder System
Automatic Reminder Scheduling
Email Notifications
Upcoming Task Alerts
Scheduler Support
📧 Email Service
Welcome Email
Password Reset Email
Reminder Email
HTML Email Templates
📁 File Management
Upload Audio Files
Upload Documents
File Download
File Storage
📊 Dashboard
Meeting Statistics
Pending Tasks
Completed Tasks
Upcoming Meetings
AI Insights
🤖 OpenAI Integration
Meeting Summary
Action Item Extraction
Task Suggestions
Smart Meeting Analysis
AI Workflow
Meeting Audio
      │
      ▼
Speech-to-Text
      │
      ▼
OpenAI Analysis
      │
 ┌────┴─────────┐
 │              │
Summary     Action Items
 │              │
 ▼              ▼
Assign Owners
 │
 ▼
Save to MySQL
 │
 ▼
Dashboard
 │
 ▼
Reminder Scheduler
 │
 ▼
Email Notification
 │
 ▼
Completed
🛠 Tech Stack
Backend
Java 21
Spring Boot
Spring Security
Spring Data JPA
Hibernate
MySQL
JWT
Maven
OpenAI API
Java Mail Sender
Scheduler
Swagger/OpenAPI
Frontend
React 19
Vite
Tailwind CSS
Axios
React Router
React Hook Form
React Icons
Recharts
Framer Motion
Database

MySQL

Backend Architecture
Controller
      │
      ▼
Service
      │
      ▼
Repository
      │
      ▼
MySQL
Backend Project Structure
src
 ├── config
 ├── controller
 ├── dto
 │    ├── request
 │    └── response
 ├── entity
 ├── repository
 ├── service
 │    └── impl
 ├── security
 ├── mapper
 ├── scheduler
 ├── exception
 ├── util
 ├── enums
 └── resources
Frontend Structure
src
 ├── assets
 ├── components
 ├── hooks
 ├── layouts
 ├── pages
 ├── services
 ├── App.jsx
 ├── main.jsx
 └── index.css
Backend Modules
Authentication
Register
Login
JWT Token
Forgot Password
Reset Password
User Module
CRUD User
Update Profile
Role Management
Meeting Module
Create Meeting
Upload Audio
Generate Summary
Store Meeting Notes
AI Module
OpenAI Integration
Prompt Engineering
Meeting Summary
Action Item Extraction
AI Suggestions
Task Module
Create Task
Assign Owner
Update Status
Mark Complete
Reminder Module
Schedule Reminder
Email Reminder
Notification
Dashboard Module
Total Meetings
Completed Tasks
Pending Tasks
Upcoming Meetings
File Module
Upload Files
Download Files
Delete Files
Database Entities
User
Role
Meeting
MeetingSummary
Task
Reminder
Notification
FileData
REST APIs
Authentication
POST    /api/auth/register
POST    /api/auth/login
POST    /api/auth/forgot-password
POST    /api/auth/reset-password
Users
GET     /api/users
GET     /api/users/{id}
PUT     /api/users/{id}
DELETE  /api/users/{id}
Meetings
POST    /api/meetings
GET     /api/meetings
GET     /api/meetings/{id}
PUT     /api/meetings/{id}
DELETE  /api/meetings/{id}

POST    /api/meetings/upload-audio
POST    /api/meetings/generate-summary
Tasks
POST    /api/tasks
GET     /api/tasks
PUT     /api/tasks/{id}
DELETE  /api/tasks/{id}
Reminder
POST    /api/reminders
GET     /api/reminders
PUT     /api/reminders/{id}
DELETE  /api/reminders/{id}
Dashboard
GET /api/dashboard
Files
POST /api/files/upload
GET  /api/files/download/{id}
Security
JWT Authentication
Spring Security
BCrypt Password Encoder
Role Based Access
CORS Configuration
Exception Handling
Scheduler
Email Scheduler
Reminder Scheduler
Automatic Notifications
Email Templates
welcome-email.html
password-reset.html
reminder-email.html
Exception Handling
Resource Not Found
Unauthorized
Bad Request
File Storage Exception
Global Exception Handler
Configuration
application.properties
application-dev.properties
application-prod.properties
Future Enhancements
Google Calendar Integration
Microsoft Teams Integration
Zoom Integration
Google Meet Integration
Microsoft Outlook Sync
AI Chat Assistant
Voice Commands
OCR Support
Multi-language Transcription
Real-time Meeting Transcription
Team Collaboration Workspace
Mobile Application (Android & iOS)
WebSocket Notifications
Analytics & Productivity Reports
Installation
Clone Repository
git clone https://github.com/your-username/MeetMindAI.git
Backend
cd MeetMindAI

mvn clean install

mvn spring-boot:run
Frontend
cd frontend

npm install

npm run dev
Database

Create a MySQL database:

CREATE DATABASE meetmind_ai;

Configure application.properties:

spring.datasource.url=jdbc:mysql://localhost:3306/meetmind_ai
spring.datasource.username=root
spring.datasource.password=your_password

spring.jpa.hibernate.ddl-auto=update
Project Highlights
AI-powered meeting summarization
Automatic speech-to-text processing
Intelligent action item extraction
Owner assignment for tasks
Email reminder automation
JWT-based secure authentication
Modern React + Tailwind CSS frontend
Spring Boot REST APIs
MySQL database integration
OpenAI-powered meeting intelligence
Responsive dashboard with analytics
Scalable layered architecture for enterprise applications
Ideal Use Cases
Corporate Teams
Startups
Universities
Project Management
Scrum Meetings
Client Discussions
HR Interviews
Sales Meetings
Product Planning
Remote Collaboration
License

This project is licensed under the MIT License. Feel free to use, modify, and contribute to enhance MeetMind AI.
