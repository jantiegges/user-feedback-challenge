# User Feedback Challenge

## 🎯 Challenge Overview

Build a feedback management system that processes user feedback using AI, stores it in a database, creates GitHub issues, and sends automated emails.

## 🚀 Requirements

### 1. Feedback Classification
- Use Vercel AI SDK to classify incoming feedback into three categories:
  - 🐛 Bug Report
  - ✨ Feature Request
  - 💌 Love Letter
- Implement proper error handling for AI classification

### 2. Data Storage
- Store the feedback and its classification in a database
- Required fields:
  - Feedback text
  - Classification
  - User id
  - Timestamp

### 3. GitHub Integration
- Create a GitHub issue for each feedback item
- Issue should include:
  - Title based on classification
  - Feedback content
  - Labels corresponding to the classification
  - Reference ID to the database entry

### 4. Email Notification
- Integrate with Listmonk to send confirmation emails
- Send different email templates based on feedback classification
- Include a reference number in the email