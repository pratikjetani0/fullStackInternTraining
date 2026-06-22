# NestJS E-Commerce Backend with Microservices

## Project Overview

This project is a production-style E-Commerce Backend built using NestJS, Prisma ORM, PostgreSQL, and NestJS Microservices.

The application demonstrates authentication, authorization, product management, cart management, order processing, payment simulation, notification handling, email integration, admin analytics, and microservice communication.

The project follows a modular architecture with Repository Pattern, Role-Based Access Control (RBAC), JWT Authentication, Prisma Transactions, and Event-Driven Architecture.

---

# Tech Stack

## Backend

- NestJS
- TypeScript
- Prisma ORM
- PostgreSQL

## Authentication

- JWT Access Tokens
- JWT Refresh Tokens
- Passport JWT
- Role-Based Access Control (RBAC)

## Microservices

- NestJS Microservices
- TCP Transport
- Event-Driven Communication

## Notifications

- Nodemailer
- SMTP Email Service
- HTML Email Templates

## Documentation

- Swagger

---

# Project Architecture

```text
Client
   │
   ▼
API Gateway
   │
   ├── Auth Module
   ├── Users Module
   ├── Products Module
   ├── Cart Module
   ├── Orders Module
   ├── Payments Module
   ├── Notifications Module
   └── Admin Module
   │
   ▼
PostgreSQL
   ▲
   │
Notification Service
   │
   ├── Event Handler
   ├── Notification Storage
   └── Email Service
```

---

# Features

## Authentication & Authorization

### User Registration

- Register new users
- Password hashing using bcrypt

### User Login

- JWT Access Token generation
- JWT Refresh Token generation

### Refresh Token

- Secure refresh token storage
- Token rotation support

### RBAC

Roles:

- ADMIN
- USER

Protected endpoints using:

- JwtAuthGuard
- RolesGuard

---

# User Management

### Get Current User

```http
GET /users/me
```

### Update Profile

```http
PATCH /users/me
```

Features:

- View profile information
- Update profile information

---

# Product Management

### Create Product

```http
POST /products
```

### Get All Products

```http
GET /products
```

### Get Product By ID

```http
GET /products/:id
```

### Update Product

```http
PATCH /products/:id
```

### Delete Product

```http
DELETE /products/:id
```

Features:

- Product CRUD
- Stock Management
- Admin-only access

---

# Cart Management

### Get Cart

```http
GET /cart
```

### Add Product To Cart

```http
POST /cart
```

### Update Cart Item Quantity

```http
PATCH /cart/items/:id
```

### Remove Cart Item

```http
DELETE /cart/items/:id
```

### Clear Cart

```http
DELETE /cart/clear
```

Features:

- User-specific carts
- Quantity management
- Stock validation

---

# Order Management

### Create Order

```http
POST /orders
```

### Get User Orders

```http
GET /orders
```

### Get Order By ID

```http
GET /orders/:id
```

### Update Order Status

```http
PATCH /orders/:id/status
```

Features:

- Order creation from cart
- Order history
- Admin order management
- Prisma transactions

---

# Payment Management

### Simulate Payment

```http
POST /payments/simulate
```

Features:

- Payment simulation
- Success / Failure handling
- Retry failed payments
- Prevent duplicate payments

Payment Status:

- PENDING
- SUCCESS
- FAILED

---

# Notification Microservice

## Event-Driven Architecture

API Gateway emits events:

```text
notification.created
```

Notification Service listens using:

```ts
@EventPattern('notification.created')
```

### Notification Flow

```text
Order Created
     │
     ▼
Notification Event
     │
     ▼
Notification Service
     │
     ├── Save Notification
     └── Send Email
```

---

# Notifications

### Get My Notifications

```http
GET /notifications/me
```

### Mark Notification As Read

```http
PATCH /notifications/:id/read
```

Features:

- Notification storage
- Read/unread status
- User-specific notifications

---

# Email Service

Integrated using:

- Nodemailer
- SMTP

Email Templates:

### Order Confirmation

Triggered when:

```text
Order Created
```

### Payment Success

Triggered when:

```text
Payment Successful
```

HTML templates are maintained separately for better scalability.

---

# Admin Dashboard

### Get Users

```http
GET /admin/users
```

Features:

- Pagination
- Search
- User listing

### Orders Summary

```http
GET /admin/orders/summary
```

Provides:

- Total Orders
- Pending Orders
- Paid Orders
- Shipped Orders
- Delivered Orders
- Cancelled Orders
- Revenue Summary

### Products Summary

```http
GET /admin/products/summary
```

Provides:

- Total Products
- Out Of Stock Products

---

# Database

## ORM

Prisma ORM

## Database

PostgreSQL

## Main Entities

- User
- Product
- Cart
- CartItem
- Order
- OrderItem
- Payment
- Notification

---

# Security Features

- Password Hashing
- JWT Authentication
- Refresh Tokens
- Role-Based Access Control
- Route Protection
- Global Exception Handling
- Validation Pipes

---

# Design Patterns Used

## Repository Pattern

Separates:

- Database Layer
- Business Logic Layer

## Service Layer Pattern

Encapsulates business rules.

## Event-Driven Architecture

Microservice communication through events.

## Modular Architecture

Feature-based NestJS modules.

---

# API Documentation

Swagger is integrated.

Access:

```text
http://localhost:3000/docs
```

Features:

- Interactive API documentation
- JWT Authorization support
- DTO examples
- Request/Response schemas

---

# Environment Variables

```env
DATABASE_URL=

JWT_ACCESS_SECRET=
JWT_REFRESH_SECRET=

EMAIL_USER=
EMAIL_PASSWORD=
```

---

# Installation

Clone Repository

```bash
git clone <repository-url>
```

Install Dependencies

```bash
npm install
```

Run Migrations

```bash
npx prisma migrate dev
```

Start API Gateway

```bash
npm run start:dev
```

Start Notification Service

```bash
npm run start:notification
```

---

# Key Concepts Demonstrated

- NestJS Modules
- Controllers
- Services
- Guards
- Decorators
- Exception Filters
- Prisma ORM
- PostgreSQL
- JWT Authentication
- Refresh Tokens
- RBAC
- Transactions
- Microservices
- TCP Transport
- EventPattern
- Email Integration
- Swagger Documentation
- Repository Pattern
- Event-Driven Architecture

---

# Author

Pratik Jetani
