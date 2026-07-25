# 🚀 MeetMindAI – AI-Powered Smart Meeting Assistant

MeetMindAI is an AI-powered meeting management platform that automatically converts meeting audio into text, generates intelligent summaries, extracts action items, assigns task owners, sends email reminders, and provides a real-time dashboard for tracking meetings and productivity.

The application is built using **Spring Boot**, **React.js**, **MySQL**, **OpenAI API**, **JWT Authentication**, and **Tailwind CSS**.

---

# ✨ Features

## Authentication
- JWT Authentication
- User Registration
- Secure Login
- Role Based Authorization
- Password Encryption (BCrypt)

---

## AI Meeting Assistant

- Upload Meeting Audio
- Speech-to-Text Conversion
- AI Meeting Summary
- AI Action Item Extraction
- AI Task Prioritization
- AI Generated Meeting Notes

---

## Meeting Management

- Create Meeting
- Update Meeting
- Delete Meeting
- View Meeting History
- Meeting Participants
- Meeting Timeline

---

## Task Management

- Auto-generated Tasks
- Manual Task Creation
- Assign Task Owners
- Task Priority
- Task Status
- Due Dates
- Progress Tracking

---

## Reminder System

- Email Reminder
- Scheduled Reminder
- Meeting Reminder
- Task Reminder
- Notification Center

---

## Dashboard

- Total Meetings
- Pending Tasks
- Completed Tasks
- Upcoming Meetings
- Productivity Analytics
- Meeting Statistics

---

## File Management

- Upload Audio Files
- Upload Documents
- File Download
- Secure File Storage

---

# 🏗️ Tech Stack

## Backend

- Java 21
- Spring Boot
- Spring Security
- Spring Data JPA
- Hibernate
- MySQL
- JWT
- OpenAI API
- Java Mail Sender
- Swagger OpenAPI
- Maven
- Scheduler
- Lombok
- MapStruct

---

## Frontend

- React.js
- Vite
- Tailwind CSS
- Axios
- React Router
- Context API
- React Hook Form
- Framer Motion
- Chart.js / Recharts

---

## Database

- MySQL

---

# 📂 Backend Architecture

```
Controller
     │
     ▼
Service
     │
     ▼
Repository
     │
     ▼
MySQL Database
```

---

# 🤖 AI Workflow

```
Meeting Audio
      │
      ▼
Speech To Text
      │
      ▼
OpenAI Analysis
      │
 ┌────┴────────┐
 │             │
Summary   Action Items
 │             │
 ▼             ▼
Assign Owner
 │
 ▼
Save into MySQL
 │
 ▼
Dashboard
 │
 ▼
Email Reminder
 │
 ▼
Completed
```

---

# 📂 Backend Structure

```
config/
controller/
dto/
entity/
repository/
service/
service/impl/
security/
mapper/
scheduler/
exception/
util/
enums/
```

---

# 📂 Frontend Structure

```
components/
pages/
layouts/
hooks/
services/
assets/
```

---

# 🔐 Security

- JWT Authentication
- BCrypt Password Encoder
- Role Based Access
- Protected APIs
- CORS Configuration

---

# 📧 Email Features

- Welcome Email
- Meeting Reminder
- Task Reminder
- Password Reset
- HTML Email Templates

---

# 📊 Dashboard

- Meeting Analytics
- Task Analytics
- Completion Percentage
- Productivity Score
- Recent Meetings

---

# ⚙️ Installation

## Clone

```bash
git clone https://github.com/yourusername/MeetMindAI.git
```

---

## Backend

```bash
cd MeetMindAI

mvn clean install

mvn spring-boot:run
```

Runs on

```
http://localhost:8080
```

---

## Frontend

```bash
cd my-app

npm install

npm run dev
```

Runs on

```
http://localhost:5173
```

---

# Swagger

```
http://localhost:8080/swagger-ui/index.html
```

---

# API Modules

- Authentication
- Users
- Meetings
- Tasks
- Dashboard
- Notifications
- Reminders
- Files

---

# Future Enhancements

- Google Calendar Integration
- Microsoft Teams Integration
- Zoom Integration
- Google Meet Integration
- Real-time Meeting Transcription
- Voice Commands
- AI Chat Assistant
- Sentiment Analysis
- Multi-language Support
- Mobile Application

---

# Contributors

Developer:
Your Name

---

# License

MIT License
