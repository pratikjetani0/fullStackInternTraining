# NestJS Notification Microservice

A dedicated Notification Microservice built using NestJS Microservices. This service listens to application events and sends email notifications independently from the main application.

The goal is to demonstrate event-driven architecture and microservice communication in a scalable backend system.

---

# Features

## Email Notifications

- Welcome Email
- Bookmark Created Notification

## Microservice Communication

- TCP Transport
- Event-Based Messaging

---

# Tech Stack

- NestJS
- TypeScript
- NestJS Microservices
- Nodemailer
- TCP Transport
- EventEmitter
- Logger

---

# Architecture

```text
Main API
   │
   │ emit()
   ▼
Notification Microservice
   │
   ├── Event Handler
   ├── Email Service
```

---

# Project Structure

```bash
src
│
├── notification
│   ├── dto
│   ├── notification.controller.ts
│   ├── notification.service.ts
│   └── notification.module.ts
│
├── email
│   ├── email.service.ts
│   ├── email.module.ts
│   └── templates
│
└── main.ts
```

---

# Supported Events

## Welcome Email

```ts
send_email;
```

Payload:

```json
{
  "email": "user@example.com",
  "subject": "Welcome",
  "message": "Welcome to the platform"
}
```

---

## Bookmark Created

```json
{
  "email": "user@example.com",
  "subject": "Bookmark Created",
  "message": "Your bookmark was created successfully"
}
```

---

# Event Handler Example

```ts
@EventPattern('send_email')
handleSendEmail(data: SendEmailDto) {
  return this.emailService.sendEmail(data);
}
```

---

# Environment Variables

```env
MAIL_USER=example@gmail.com
MAIL_PASSWORD=app-password
```

---

# Start Service

Install dependencies:

```bash
npm install
```

Run:

```bash
npm run start:dev
```

---

# Future Improvements

- Redis Transport
- RabbitMQ Transport
- Notification Analytics

---

# Author

Pratik Jetani
