# NestJS Bookmark API

A production-style REST API built with NestJS, Prisma, PostgreSQL, JWT Authentication, Refresh Tokens, Repository Pattern, E2E Testing, and Logging.

---

## Features

### Authentication

- User Signup
- User Signin
- JWT Access Token Authentication
- Refresh Token Authentication
- Refresh Token Rotation
- Logout Functionality
- Password Hashing using bcrypt

### User Management

- Get Current User Profile
- Update User Profile

### Bookmark Management

- Create Bookmark
- Get All Bookmarks
- Get Bookmark By Id
- Update Bookmark
- Delete Bookmark

### Security

- JWT Authentication Guard
- Refresh Token Guard
- Password Hashing
- Refresh Token Hashing
- Protected Routes
- Validation using DTOs

### Testing

- End-to-End (E2E) Testing
- Dedicated Testing Database

### Logging

- NestJS Logger
- Request & Authentication Logging

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

---

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

## Sign Up

```http
POST /auth/signup
```

Request:

```json
{
  "email": "test@test.com",
  "password": "123456"
}
```

---

## Sign In

```http
POST /auth/signin
```

Response:

```json
{
  "access_token": "jwt-token",
  "refresh_token": "refresh-token"
}
```

---

## Refresh Token

```http
POST /auth/refresh
```

Request:

```json
{
  "refreshToken": "refresh-token"
}
```

Response:

```json
{
  "access_token": "new-access-token",
  "refresh_token": "new-refresh-token"
}
```

---

## Logout

```http
POST /auth/logout
```

Removes stored refresh token hash from database.

---

# Refresh Token Rotation

The application implements Refresh Token Rotation.

Flow:

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
Old Refresh Token Becomes Invalid
```

Benefits:

- Better Security
- Token Theft Protection
- Production-Level Authentication

---

# Repository Pattern

Business Logic and Database Queries are separated.

### Service Layer

Contains:

- Business Logic
- Validation Logic
- Authorization Logic

Example:

```ts
async deleteBookmarkById(userId: number, bookmarkId: number)
```

---

### Repository Layer

Contains:

- Database Queries
- Prisma Operations

Example:

```ts
findBookmarkById(id: number)

createBookmark(dto)

deleteBookmark(id)
```

---

# Running the Project

## Install Dependencies

```bash
npm install
```

---

## Configure Environment Variables

Create:

```env
.env
```

```env
DATABASE_URL=postgresql://postgres:password@localhost:5432/main_nest_bookmark_api

JWT_SECRET=your-secret-key
```

---

## Run Prisma Migration

```bash
npx prisma migrate dev
```

---

## Generate Prisma Client

```bash
npx prisma generate
```

---

## Start Development Server

```bash
npm run start:dev
```

---

# Testing

## Run E2E Tests

```bash
npm run test:e2e
```

Tests cover:

- Signup
- Signin
- Refresh Token
- Logout
- Get Current User
- Bookmark CRUD Operations

---

# Logging

Application uses NestJS Logger.

Examples:

```text
[AuthService] Signup attempt for test@test.com

[AuthService] User created successfully

[AuthService] Signin attempt for test@test.com

[AuthService] User logged in successfully
```

---

# Author

**Pratik Jetani**
