# E-Commerce Backend API

A scalable REST API built using **Node.js**, **Express.js**, **TypeScript**, **PostgreSQL**, and **TypeORM**. The project implements user management, authentication, authorization, product management, and shopping cart functionality.

---

# Tech Stack

- Node.js
- Express.js
- TypeScript
- PostgreSQL
- TypeORM
- JWT Authentication
- Bcrypt
- Zod Validation
- Postman
- TypeORM Migrations

---

# Features

## User Management

- Create User
- Get All Users
- Get User By ID
- Update User
- Delete User

---

## Authentication & Authorization

- User Registration
- User Login
- User Logout
- Password Hashing using Bcrypt
- JWT Authentication
- Role-Based Authorization
- Protected Routes
- Admin-Only Routes

---

## Product Management

- Create Product (Admin Only)
- Get All Products
- Get Product By ID
- Update Product (Admin Only)
- Delete Product (Admin Only)

---

## Shopping Cart

- Add Product to Cart
- Get Current User Cart
- Update Cart Item Quantity
- Remove Cart Item
- Clear Entire Cart

---

# Project Architecture

The project follows a layered architecture:

```text
Client
  │
  ▼
Routes
  │
  ▼
Controllers
  │
  ▼
Services
  │
  ▼
Repositories
  │
  ▼
PostgreSQL Database
```

---

# Project Structure

```text
src/
│
├── config/
├── constants/
├── database/
│   ├── entities/
│   └── migrations/
│   └── seeders/
│
├── middleware/
│
├── modules/
│   ├── auth/
│   ├── user/
│   ├── admin/
│   ├── product/
│   └── cart/
│
├── types/
│
├── app.ts
└── server.ts
```

---

# Installation

## Clone Repository

```bash
git clone <repository-url>
cd poc_01_ecomm_backend_api
```

---

## Install Dependencies

```bash
npm install
```

---

# Environment Variables

Create a `.env` file in the project root.

```env
PORT=5000

DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=your_password
DB_NAME=database_name

JWT_SECRET=your_secret_key
SEED_ADMIN_NAME=name_of_admin
SEED_ADMIN_EMAIL=admin_email
SEED_ADMIN_PASSWORD=admin_pass
```

---

# Database Setup

Create PostgreSQL database:

```sql
CREATE DATABASE ecommerce_db;
```

---

# Run Migrations

Generate migration:

```bash
npm run migration:generate -- src/database/migrations/MigrationName
```

Run migration:

```bash
npm run migration:run
```

# Seed Database

Run Seeders:

```bash
npm run seed
```

This will create:

- Admin User
- Sample Users
- Sample Products

---

# Run Project

Development Mode:

```bash
npm run dev
```

---

# API Endpoints

## Authentication

| Method | Endpoint           | Access        |
| ------ | ------------------ | ------------- |
| POST   | /api/auth/register | Public        |
| POST   | /api/auth/login    | Public        |
| POST   | /api/auth/logout   | Authenticated |

---

## User

| Method | Endpoint      | Access        |
| ------ | ------------- | ------------- |
| GET    | /api/users/me | Authenticated |
| PUT    | /api/users/me | Authenticated |
| DELETE | /api/users/me | Authenticated |

---

## Admin User Management

| Method | Endpoint             | Access |
| ------ | -------------------- | ------ |
| GET    | /api/admin/users     | Admin  |
| GET    | /api/admin/users/:id | Admin  |
| PUT    | /api/admin/users/:id | Admin  |
| DELETE | /api/admin/users/:id | Admin  |

---

## Products

| Method | Endpoint          | Access |
| ------ | ----------------- | ------ |
| POST   | /api/products     | Admin  |
| GET    | /api/products     | Public |
| GET    | /api/products/:id | Public |
| PUT    | /api/products/:id | Admin  |
| DELETE | /api/products/:id | Admin  |

---

## Cart

| Method | Endpoint          | Access        |
| ------ | ----------------- | ------------- |
| POST   | /api/cart         | Authenticated |
| GET    | /api/cart         | Authenticated |
| PUT    | /api/cart/:itemId | Authenticated |
| DELETE | /api/cart/:itemId | Authenticated |
| DELETE | /api/cart         | Authenticated |

---

# Authentication

Protected routes require a JWT token.

Example:

```http
Authorization: Bearer <token>
```

---

# Roles

The application supports two roles:

```text
ADMIN
USER
```

Admin users can:

- Manage products
- Manage users

Regular users can:

- Manage their own profile
- Manage their cart

---

# Validation

Request validation is implemented using Zod.

- Email format validation
- Required field validation
- Positive price validation
- Positive quantity validation
- UUID validation

---

# Security

- Passwords are hashed using Bcrypt.
- JWT Authentication for protected routes.
- Role-based route protection.
- Environment variables for secrets.
- Database constraints and validation.

---

# Postman Collection

The project includes a Postman Collection containing:

- Authentication APIs
- User APIs
- Admin APIs
- Product APIs
- Cart APIs

---

# Author

Pratik Jetani
