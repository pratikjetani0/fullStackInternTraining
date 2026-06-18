# NestJS Bookmark API

A production-ready REST API built with NestJS, Prisma ORM, PostgreSQL, JWT Authentication, Refresh Token Rotation, Repository Pattern, Notification Microservice Integration, E2E Testing, and Structured Logging.

This project demonstrates modern backend development practices including authentication, authorization, database management, microservice communication, validation, testing, and scalable architecture.

---

# Features

## Authentication

- User Signup
- User Signin
- JWT Access Token Authentication
- Refresh Token Authentication
- Refresh Token Rotation
- Logout Functionality
- Password Hashing using bcrypt

## User Management

- Get Current User Profile
- Update User Profile

## Bookmark Management

- Create Bookmark
- Get All Bookmarks
- Get Bookmark By Id
- Update Bookmark
- Delete Bookmark

## Notification Integration

- Event-driven notification architecture
- Integration with dedicated Notification Microservice
- Email notification support
- Automatic notification triggering on application events

## Security

- JWT Authentication Guard
- Refresh Token Guard
- Password Hashing
- Refresh Token Hashing
- Protected Routes
- DTO Validation
- Authorization Checks

## Testing

- End-to-End Testing
- Dedicated Testing Database
- Automated API Validation

## Logging

- NestJS Logger
- Authentication Logs
- Request Logs
- Error Logs

---

# Tech Stack

- NestJS
- TypeScript
- PostgreSQL
- Prisma ORM
- Passport.js
- JWT
- bcrypt
- Jest
- Supertest
- EventEmitter2
- NestJS Microservices

---

# Architecture

```text
Client
  │
  ▼
NestJS API
  │
  ├── Auth Module
  ├── User Module
  ├── Bookmark Module
  ├── Prisma Module
  │
  └── Notification Client
           │
           ▼
Notification Microservice
```

---

# Project Structure

```bash
src
│
├── auth
│   ├── dto
│   ├── guards
│   ├── strategies
│   ├── auth.controller.ts
│   ├── auth.service.ts
│   └── auth.repository.ts
│
├── user
│   ├── dto
│   ├── user.controller.ts
│   ├── user.service.ts
│   └── user.repository.ts
│
├── bookmark
│   ├── dto
│   ├── bookmark.controller.ts
│   ├── bookmark.service.ts
│   └── bookmark.repository.ts
│
├── notification
│   ├── notification.client.ts
│   └── notification.module.ts
│
├── prisma
│   ├── prisma.module.ts
│   └── prisma.service.ts
│
└── main.ts
```

---

# Database Schema

## User

```prisma
model User {
  id                  Int      @id @default(autoincrement())

  email               String   @unique
  password            String

  firstName           String?
  lastName            String?

  hashedRefreshToken  String?

  bookmarks           Bookmark[]

  createdAt           DateTime @default(now())
  updatedAt           DateTime @updatedAt
}
```

## Bookmark

```prisma
model Bookmark {
  id          Int      @id @default(autoincrement())

  title       String
  description String?
  link        String

  userId      Int

  user        User @relation(fields: [userId], references: [id])

  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}
```

---

# Authentication Flow

## Signup

```http
POST /auth/signup
```

## Signin

```http
POST /auth/signin
```

Returns:

```json
{
  "access_token": "jwt-token",
  "refresh_token": "refresh-token"
}
```

## Refresh Token

```http
POST /auth/refresh
```

Returns new access and refresh tokens.

## Logout

```http
POST /auth/logout
```

Removes stored refresh token hash.

---

# Refresh Token Rotation

```text
Login
  ↓
Access Token (15m)
Refresh Token (7d)
  ↓
Store Refresh Token Hash
  ↓
Access Token Expires
  ↓
Refresh Token Request
  ↓
Validate Refresh Token
  ↓
Generate New Tokens
  ↓
Store New Refresh Token Hash
  ↓
Old Refresh Token Invalidated
```

Benefits:

- Improved Security
- Reduced Token Theft Risk
- Production-Level Authentication

---

# Repository Pattern

## Service Layer

Responsible for:

- Business Logic
- Authorization
- Validation
- Application Rules

Example:

```ts
async deleteBookmarkById(userId: number, bookmarkId: number)
```

## Repository Layer

Responsible for:

- Prisma Queries
- Database Operations
- Data Persistence

Example:

```ts
findBookmarkById(id);

createBookmark(dto);

deleteBookmark(id);
```

---

# Notification Integration

Events are emitted from the main application and processed by the Notification Microservice.

Example:

```ts
this.notificationClient.emit('send_email', {
  email: user.email,
  subject: 'Welcome',
});
```

Supported Events:

- User Registration
- Bookmark Creation

---

# Running The Project

## Install Dependencies

```bash
npm install
```

## Configure Environment Variables

```env
DATABASE_URL=postgresql://postgres:password@localhost:5432/main_nest_bookmark_api

JWT_SECRET=your-secret-key

JWT_REFRESH_SECRET=your-refresh-secret
```

## Run Migration

```bash
npx prisma migrate dev
```

## Generate Prisma Client

```bash
npx prisma generate
```

## Start Development Server

```bash
npm run start:dev
```

---

# Testing

Run E2E Tests:

```bash
npm run test:e2e
```

Coverage Includes:

- Signup
- Signin
- Refresh Token
- Logout
- User Profile
- Bookmark CRUD
- Authorization

---

# Logging

Examples:

```text
[AuthService] Signup attempt

[AuthService] User created successfully

[AuthService] User logged in successfully

[BookmarkService] Bookmark created

[BookmarkService] Bookmark deleted
```

---

# Future Improvements

- Swagger Documentation
- Email Templates
- Monitoring & Metrics

---

# Author

Pratik Jetani
