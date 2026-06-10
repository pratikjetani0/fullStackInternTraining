# NestJS CRUD REST API with Authentication

> A complete guide to building a production-ready REST API using **NestJS**, **Prisma**, **PostgreSQL**, **JWT Authentication**, and **End-to-End Testing**.

---

## Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Project Setup](#project-setup)
- [Project Structure](#project-structure)
- [Core Concepts](#core-concepts)
  - [Modules](#modules)
  - [Controllers](#controllers)
  - [Services (Providers)](#services-providers)
  - [Dependency Injection](#dependency-injection)
  - [Pipes & Validation](#pipes--validation)
  - [Guards](#guards)
  - [Decorators](#decorators)
- [Database Setup (Docker + PostgreSQL)](#database-setup-docker--postgresql)
- [Prisma ORM](#prisma-orm)
  - [Schema Definition](#schema-definition)
  - [Migrations](#migrations)
  - [Prisma Studio](#prisma-studio)
- [Environment Variables](#environment-variables)
- [Authentication (JWT)](#authentication-jwt)
  - [JWT Strategy](#jwt-strategy)
  - [Auth Guard](#auth-guard)
  - [Custom Decorator](#custom-decorator)
- [API Endpoints](#api-endpoints)
  - [Auth Routes](#auth-routes)
  - [User Routes](#user-routes)
  - [Bookmark Routes](#bookmark-routes)
- [Full Code Reference](#full-code-reference)
  - [main.ts](#maints)
  - [app.module.ts](#appmodulets)
  - [Prisma Module & Service](#prisma-module--service)
  - [Auth Module](#auth-module)
  - [Auth DTOs](#auth-dtos)
  - [Auth Service](#auth-service)
  - [Auth Controller](#auth-controller)
  - [JWT Strategy](#jwt-strategy-code)
  - [JWT Guard](#jwt-guard-code)
  - [Get User Decorator](#get-user-decorator-code)
  - [User Module](#user-module)
  - [User Controller](#user-controller)
  - [User Service](#user-service)
  - [Edit User DTO](#edit-user-dto)
  - [Bookmark Module](#bookmark-module)
  - [Bookmark Controller](#bookmark-controller)
  - [Bookmark Service](#bookmark-service)
  - [Bookmark DTOs](#bookmark-dtos)
- [NPM Scripts](#npm-scripts)
- [End-to-End Testing](#end-to-end-testing)
- [Docker Compose](#docker-compose)

---

## Overview

This project is a **CRUD REST API** for a bookmark manager application. Users can:

- Sign up and sign in with JWT-based authentication
- View and edit their own profile
- Create, read, update, and delete bookmarks

The API is built close to production standards with:
- Modular architecture (NestJS modules)
- Relational database with Prisma ORM
- Password hashing with Argon2
- JWT authentication with Passport
- Input validation with class-validator
- End-to-end tests with Pactum

---

## Tech Stack

| Tool | Purpose |
|------|---------|
| [NestJS](https://nestjs.com/) | Backend framework (built on Express) |
| [TypeScript](https://www.typescriptlang.org/) | Language |
| [Prisma](https://www.prisma.io/) | ORM / Query Builder |
| [PostgreSQL](https://www.postgresql.org/) | Relational Database |
| [Docker](https://www.docker.com/) | Containerized DB environment |
| [JWT](https://jwt.io/) | Authentication tokens |
| [Passport.js](http://www.passportjs.org/) | Authentication middleware |
| [Argon2](https://www.npmjs.com/package/argon2) | Password hashing |
| [class-validator](https://github.com/typestack/class-validator) | DTO validation |
| [class-transformer](https://github.com/typestack/class-transformer) | DTO transformation |
| [Pactum](https://pactumjs.github.io/) | End-to-end API testing |
| [Jest](https://jestjs.io/) | Testing framework |

---

## Prerequisites

- [Node.js](https://nodejs.org/) v16+ (any LTS version)
- [Docker](https://www.docker.com/) installed and running
- NestJS CLI installed globally:

```bash
npm install -g @nestjs/cli
```

---

## Project Setup

```bash
# 1. Create a new NestJS project
nest new nestjs-api-tutorial

# 2. Navigate into the project
cd nestjs-api-tutorial

# 3. Install dependencies
yarn add @nestjs/config           # Config Module
yarn add @nestjs/passport passport passport-jwt @nestjs/jwt  # Auth
yarn add @types/passport-jwt -D   # Type definitions
yarn add argon2                    # Password hashing
yarn add class-validator class-transformer  # Validation
yarn add prisma --save-dev         # Prisma CLI
yarn add @prisma/client            # Prisma Client
yarn add dotenv-cli                # Multi-env support for Prisma
yarn add pactum                    # E2E testing

# 4. Initialize Prisma
npx prisma init

# 5. Start the dev server
yarn start:dev
```

---

## Project Structure

```
src/
├── app.module.ts
├── main.ts
├── auth/
│   ├── decorator/
│   │   ├── get-user.decorator.ts
│   │   └── index.ts
│   ├── dto/
│   │   ├── auth.dto.ts
│   │   └── index.ts
│   ├── guard/
│   │   ├── jwt.guard.ts
│   │   └── index.ts
│   ├── strategy/
│   │   ├── jwt.strategy.ts
│   │   └── index.ts
│   ├── auth.controller.ts
│   ├── auth.module.ts
│   └── auth.service.ts
├── user/
│   ├── dto/
│   │   ├── edit-user.dto.ts
│   │   └── index.ts
│   ├── user.controller.ts
│   ├── user.module.ts
│   └── user.service.ts
├── bookmark/
│   ├── dto/
│   │   ├── create-bookmark.dto.ts
│   │   ├── edit-bookmark.dto.ts
│   │   └── index.ts
│   ├── bookmark.controller.ts
│   ├── bookmark.module.ts
│   └── bookmark.service.ts
└── prisma/
    ├── prisma.module.ts
    └── prisma.service.ts

prisma/
├── schema.prisma
└── migrations/

test/
└── app.e2e-spec.ts

docker-compose.yml
.env
.env.test
```

---

## Core Concepts

### Modules

NestJS organizes applications into **feature modules**. Each module is a class decorated with `@Module()`.

```typescript
import { Module } from '@nestjs/common';

@Module({
  imports: [],
  controllers: [],
  providers: [],
  exports: [],
})
export class AuthModule {}
```

The root module (`AppModule`) imports all feature modules.

### Controllers

Controllers handle **incoming HTTP requests** and return responses. They are decorated with `@Controller()`.

```typescript
import { Controller, Get, Post } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  @Post('signup')
  signup() {
    return 'I am signed up';
  }

  @Post('signin')
  signin() {
    return 'I am signed in';
  }
}
```

### Services (Providers)

Services hold the **business logic** — database queries, hashing, etc. Decorated with `@Injectable()`.

```typescript
import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  signup() {
    // business logic
  }

  signin() {
    // business logic
  }
}
```

### Dependency Injection

NestJS manages dependencies automatically. Inject a service using the constructor shorthand:

```typescript
@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}
}
```

NestJS instantiates `PrismaService` and passes it in — no `new` keyword needed.

### Pipes & Validation

Pipes **transform or validate** incoming data. Use `ValidationPipe` globally in `main.ts`:

```typescript
app.useGlobalPipes(
  new ValidationPipe({
    whitelist: true, // strips unknown fields from DTO
  }),
);
```

Mark DTO properties with class-validator decorators:

```typescript
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class AuthDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
```

### Guards

Guards **allow or block** route execution. Applied with `@UseGuards()`:

```typescript
@UseGuards(JwtGuard)
@Get('me')
getMe() { ... }
```

You can apply guards at the route, controller, or global level.

### Decorators

Custom param decorators extract specific data from the request:

```typescript
// Usage
@Get('me')
getMe(@GetUser() user: User) {
  return user;
}

// Get a specific field
@Get('me')
getMe(@GetUser('email') email: string) {
  return email;
}
```

---

## Database Setup (Docker + PostgreSQL)

```yaml
# docker-compose.yml
version: '3.8'
services:
  dev-db:
    image: postgres:13
    ports:
      - 5434:5432
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: 123
      POSTGRES_DB: nest
    networks:
      - freecodecamp
  test-db:
    image: postgres:13
    ports:
      - 5435:5432
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: 123
      POSTGRES_DB: nest
    networks:
      - freecodecamp

networks:
  freecodecamp:
```

---

## Prisma ORM

### Schema Definition

```prisma
// prisma/schema.prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id        Int       @id @default(autoincrement())
  createdAt DateTime  @default(now())
  updatedAt DateTime  @updatedAt

  email     String    @unique
  hash      String

  firstName String?
  lastName  String?

  bookmarks Bookmark[]

  @@map("users")
}

model Bookmark {
  id          Int      @id @default(autoincrement())
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  title       String
  description String?
  link        String

  userId      Int
  user        User     @relation(fields: [userId], references: [id])

  @@map("bookmarks")
}
```

### Migrations

```bash
# Create and apply a new migration (dev only)
npx prisma migrate dev --name init

# Apply existing migrations to DB (production/test safe)
npx prisma migrate deploy

# Regenerate TypeScript types from schema
npx prisma generate
```

### Prisma Studio

```bash
# Browse your database visually
npx prisma studio

# Use a specific .env file
dotenv -e .env.test -- npx prisma studio
```

---

## Environment Variables

**.env** (development)
```env
DATABASE_URL="postgresql://postgres:123@localhost:5434/nest?schema=public"
JWT_SECRET="super-secret"
```

**.env.test** (testing)
```env
DATABASE_URL="postgresql://postgres:123@localhost:5435/nest?schema=public"
JWT_SECRET="super-secret"
```

---

## Authentication (JWT)

### JWT Strategy

The strategy validates the JWT from the `Authorization: Bearer <token>` header, finds the user in the DB, and attaches it to `req.user`.

### Auth Guard

A custom guard wraps `AuthGuard('jwt')` from Passport for clean usage.

### Custom Decorator

`@GetUser()` extracts the user (or a specific field) from the request object, set by the JWT strategy.

---

## API Endpoints

### Auth Routes

| Method | Path | Description | Auth Required |
|--------|------|-------------|---------------|
| POST | `/auth/signup` | Register a new user | No |
| POST | `/auth/signin` | Login, returns JWT | No |

**Request body (both routes):**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### User Routes

| Method | Path | Description | Auth Required |
|--------|------|-------------|---------------|
| GET | `/users/me` | Get current user | Yes |
| PATCH | `/users` | Edit current user | Yes |

**Edit User request body (all optional):**
```json
{
  "email": "newemail@example.com",
  "firstName": "John",
  "lastName": "Doe"
}
```

### Bookmark Routes

| Method | Path | Description | Auth Required |
|--------|------|-------------|---------------|
| GET | `/bookmarks` | Get all user bookmarks | Yes |
| POST | `/bookmarks` | Create a bookmark | Yes |
| GET | `/bookmarks/:id` | Get bookmark by ID | Yes |
| PATCH | `/bookmarks/:id` | Edit bookmark by ID | Yes |
| DELETE | `/bookmarks/:id` | Delete bookmark by ID | Yes |

**Create Bookmark request body:**
```json
{
  "title": "My First Bookmark",
  "link": "https://www.freecodecamp.org",
  "description": "Optional description"
}
```

---

## Full Code Reference

### main.ts

```typescript
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );
  await app.listen(3333);
}
bootstrap();
```

### app.module.ts

```typescript
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { BookmarkModule } from './bookmark/bookmark.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    UserModule,
    BookmarkModule,
    PrismaModule,
  ],
})
export class AppModule {}
```

### Prisma Module & Service

```typescript
// prisma/prisma.module.ts
import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Global()
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
```

```typescript
// prisma/prisma.service.ts
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient {
  constructor(config: ConfigService) {
    super({
      datasources: {
        db: {
          url: config.get('DATABASE_URL'),
        },
      },
    });
  }

  cleanDb() {
    return this.$transaction([
      this.bookmark.deleteMany(),
      this.user.deleteMany(),
    ]);
  }
}
```

### Auth Module

```typescript
// auth/auth.module.ts
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategy';

@Module({
  imports: [JwtModule.register({})],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
```

### Auth DTOs

```typescript
// auth/dto/auth.dto.ts
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class AuthDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
```

```typescript
// auth/dto/index.ts
export * from './auth.dto';
```

### Auth Service

```typescript
// auth/auth.service.ts
import { ForbiddenException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import * as argon from 'argon2';
import { PrismaService } from '../prisma/prisma.service';
import { AuthDto } from './dto';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

  async signup(dto: AuthDto) {
    // Generate password hash
    const hash = await argon.hash(dto.password);

    try {
      // Save the new user in DB
      const user = await this.prisma.user.create({
        data: {
          email: dto.email,
          hash,
        },
      });

      return this.signToken(user.id, user.email);
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('Credentials taken');
        }
      }
      throw error;
    }
  }

  async signin(dto: AuthDto) {
    // Find the user by email
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    // Guard: user not found
    if (!user) throw new ForbiddenException('Credentials incorrect');

    // Compare passwords
    const pwMatches = await argon.verify(user.hash, dto.password);

    // Guard: wrong password
    if (!pwMatches) throw new ForbiddenException('Credentials incorrect');

    return this.signToken(user.id, user.email);
  }

  async signToken(
    userId: number,
    email: string,
  ): Promise<{ access_token: string }> {
    const payload = { sub: userId, email };
    const secret = this.config.get('JWT_SECRET');

    const token = await this.jwt.signAsync(payload, {
      expiresIn: '15m',
      secret,
    });

    return { access_token: token };
  }
}
```

### Auth Controller

```typescript
// auth/auth.controller.ts
import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  signup(@Body() dto: AuthDto) {
    return this.authService.signup(dto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('signin')
  signin(@Body() dto: AuthDto) {
    return this.authService.signin(dto);
  }
}
```

### JWT Strategy Code

```typescript
// auth/strategy/jwt.strategy.ts
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    config: ConfigService,
    private prisma: PrismaService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.get('JWT_SECRET'),
    });
  }

  async validate(payload: { sub: number; email: string }) {
    const user = await this.prisma.user.findUnique({
      where: { id: payload.sub },
    });
    delete user.hash;
    return user;
  }
}
```

```typescript
// auth/strategy/index.ts
export * from './jwt.strategy';
```

### JWT Guard Code

```typescript
// auth/guard/jwt.guard.ts
import { AuthGuard } from '@nestjs/passport';

export class JwtGuard extends AuthGuard('jwt') {
  constructor() {
    super();
  }
}
```

```typescript
// auth/guard/index.ts
export * from './jwt.guard';
```

### Get User Decorator Code

```typescript
// auth/decorator/get-user.decorator.ts
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const GetUser = createParamDecorator(
  (data: string | undefined, ctx: ExecutionContext) => {
    const request: Express.Request = ctx.switchToHttp().getRequest();
    if (data) {
      return request.user[data];
    }
    return request.user;
  },
);
```

```typescript
// auth/decorator/index.ts
export * from './get-user.decorator';
```

### User Module

```typescript
// user/user.module.ts
import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
```

### User Controller

```typescript
// user/user.controller.ts
import { Body, Controller, Get, Patch, UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';
import { GetUser } from '../auth/decorator';
import { JwtGuard } from '../auth/guard';
import { EditUserDto } from './dto';
import { UserService } from './user.service';

@UseGuards(JwtGuard)
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('me')
  getMe(@GetUser() user: User) {
    return user;
  }

  @Patch()
  editUser(
    @GetUser('id') userId: number,
    @Body() dto: EditUserDto,
  ) {
    return this.userService.editUser(userId, dto);
  }
}
```

### User Service

```typescript
// user/user.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { EditUserDto } from './dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async editUser(userId: number, dto: EditUserDto) {
    const user = await this.prisma.user.update({
      where: { id: userId },
      data: { ...dto },
    });
    delete user.hash;
    return user;
  }
}
```

### Edit User DTO

```typescript
// user/dto/edit-user.dto.ts
import { IsEmail, IsOptional, IsString } from 'class-validator';

export class EditUserDto {
  @IsEmail()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  firstName?: string;

  @IsString()
  @IsOptional()
  lastName?: string;
}
```

```typescript
// user/dto/index.ts
export * from './edit-user.dto';
```

### Bookmark Module

```typescript
// bookmark/bookmark.module.ts
import { Module } from '@nestjs/common';
import { BookmarkController } from './bookmark.controller';
import { BookmarkService } from './bookmark.service';

@Module({
  controllers: [BookmarkController],
  providers: [BookmarkService],
})
export class BookmarkModule {}
```

### Bookmark Controller

```typescript
// bookmark/bookmark.controller.ts
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { GetUser } from '../auth/decorator';
import { JwtGuard } from '../auth/guard';
import { BookmarkService } from './bookmark.service';
import { CreateBookmarkDto, EditBookmarkDto } from './dto';

@UseGuards(JwtGuard)
@Controller('bookmarks')
export class BookmarkController {
  constructor(private bookmarkService: BookmarkService) {}

  @Get()
  getBookmarks(@GetUser('id') userId: number) {
    return this.bookmarkService.getBookmarks(userId);
  }

  @Get(':id')
  getBookmarkById(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) bookmarkId: number,
  ) {
    return this.bookmarkService.getBookmarkById(userId, bookmarkId);
  }

  @Post()
  createBookmark(
    @GetUser('id') userId: number,
    @Body() dto: CreateBookmarkDto,
  ) {
    return this.bookmarkService.createBookmark(userId, dto);
  }

  @Patch(':id')
  editBookmarkById(
    @GetUser('id') userId: number,
    @Body() dto: EditBookmarkDto,
    @Param('id', ParseIntPipe) bookmarkId: number,
  ) {
    return this.bookmarkService.editBookmarkById(userId, bookmarkId, dto);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  deleteBookmarkById(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) bookmarkId: number,
  ) {
    return this.bookmarkService.deleteBookmarkById(userId, bookmarkId);
  }
}
```

### Bookmark Service

```typescript
// bookmark/bookmark.service.ts
import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateBookmarkDto, EditBookmarkDto } from './dto';

@Injectable()
export class BookmarkService {
  constructor(private prisma: PrismaService) {}

  getBookmarks(userId: number) {
    return this.prisma.bookmark.findMany({
      where: { userId },
    });
  }

  getBookmarkById(userId: number, bookmarkId: number) {
    return this.prisma.bookmark.findFirst({
      where: { id: bookmarkId, userId },
    });
  }

  async createBookmark(userId: number, dto: CreateBookmarkDto) {
    const bookmark = await this.prisma.bookmark.create({
      data: { userId, ...dto },
    });
    return bookmark;
  }

  async editBookmarkById(
    userId: number,
    bookmarkId: number,
    dto: EditBookmarkDto,
  ) {
    // Get the bookmark
    const bookmark = await this.prisma.bookmark.findUnique({
      where: { id: bookmarkId },
    });

    // Check ownership
    if (!bookmark || bookmark.userId !== userId) {
      throw new ForbiddenException('Access to resource denied');
    }

    return this.prisma.bookmark.update({
      where: { id: bookmarkId },
      data: { ...dto },
    });
  }

  async deleteBookmarkById(userId: number, bookmarkId: number) {
    const bookmark = await this.prisma.bookmark.findUnique({
      where: { id: bookmarkId },
    });

    // Check ownership
    if (!bookmark || bookmark.userId !== userId) {
      throw new ForbiddenException('Access to resource denied');
    }

    await this.prisma.bookmark.delete({
      where: { id: bookmarkId },
    });
  }
}
```

### Bookmark DTOs

```typescript
// bookmark/dto/create-bookmark.dto.ts
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateBookmarkDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsNotEmpty()
  link: string;
}
```

```typescript
// bookmark/dto/edit-bookmark.dto.ts
import { IsOptional, IsString } from 'class-validator';

export class EditBookmarkDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  link?: string;
}
```

```typescript
// bookmark/dto/index.ts
export * from './create-bookmark.dto';
export * from './edit-bookmark.dto';
```

---

## NPM Scripts

Add these to `package.json`:

```json
{
  "scripts": {
    "start:dev": "nest start --watch",
    "db:dev:rm": "docker compose rm dev-db -s -f -v",
    "db:dev:up": "docker compose up dev-db -d",
    "db:dev:restart": "yarn db:dev:rm && yarn db:dev:up && sleep 1 && yarn prisma:dev:deploy",
    "prisma:dev:deploy": "prisma migrate deploy",
    "db:test:rm": "docker compose rm test-db -s -f -v",
    "db:test:up": "docker compose up test-db -d",
    "db:test:restart": "yarn db:test:rm && yarn db:test:up && sleep 1 && yarn prisma:test:deploy",
    "prisma:test:deploy": "dotenv -e .env.test -- prisma migrate deploy",
    "test:e2e": "dotenv -e .env.test -- jest --watch --no-cache --config ./test/jest-e2e.json",
    "pretest:e2e": "yarn db:test:restart"
  }
}
```

---

## End-to-End Testing

```typescript
// test/app.e2e-spec.ts
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as pactum from 'pactum';
import { AppModule } from '../src/app.module';
import { PrismaService } from '../src/prisma/prisma.service';
import { AuthDto } from '../src/auth/dto';
import { EditUserDto } from '../src/user/dto';
import { CreateBookmarkDto, EditBookmarkDto } from '../src/bookmark/dto';

describe('App e2e', () => {
  let app: INestApplication;
  let prisma: PrismaService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
    await app.init();
    await app.listen(3334);

    prisma = app.get(PrismaService);
    await prisma.cleanDb();

    pactum.request.setBaseUrl('http://localhost:3334');
  });

  afterAll(() => app.close());

  // ---------- Auth ----------
  describe('Auth', () => {
    const dto: AuthDto = {
      email: 'vlad@gmail.com',
      password: '123',
    };

    describe('Signup', () => {
      it('should throw if email empty', () => {
        return pactum.spec()
          .post('/auth/signup')
          .withBody({ password: dto.password })
          .expectStatus(400);
      });

      it('should throw if password empty', () => {
        return pactum.spec()
          .post('/auth/signup')
          .withBody({ email: dto.email })
          .expectStatus(400);
      });

      it('should throw if no body', () => {
        return pactum.spec()
          .post('/auth/signup')
          .expectStatus(400);
      });

      it('should signup', () => {
        return pactum.spec()
          .post('/auth/signup')
          .withBody(dto)
          .expectStatus(201);
      });
    });

    describe('Signin', () => {
      it('should throw if email empty', () => {
        return pactum.spec()
          .post('/auth/signin')
          .withBody({ password: dto.password })
          .expectStatus(400);
      });

      it('should throw if password empty', () => {
        return pactum.spec()
          .post('/auth/signin')
          .withBody({ email: dto.email })
          .expectStatus(400);
      });

      it('should throw if no body', () => {
        return pactum.spec()
          .post('/auth/signin')
          .expectStatus(400);
      });

      it('should signin', () => {
        return pactum.spec()
          .post('/auth/signin')
          .withBody(dto)
          .expectStatus(200)
          .stores('userAt', 'access_token');
      });
    });
  });

  // ---------- User ----------
  describe('User', () => {
    describe('Get me', () => {
      it('should get current user', () => {
        return pactum.spec()
          .get('/users/me')
          .withHeaders({ Authorization: 'Bearer $S{userAt}' })
          .expectStatus(200);
      });
    });

    describe('Edit user', () => {
      const dto: EditUserDto = {
        firstName: 'Vladimir',
        email: 'vlad@codewithvlad.com',
      };

      it('should edit user', () => {
        return pactum.spec()
          .patch('/users')
          .withHeaders({ Authorization: 'Bearer $S{userAt}' })
          .withBody(dto)
          .expectStatus(200)
          .expectBodyContains(dto.firstName)
          .expectBodyContains(dto.email);
      });
    });
  });

  // ---------- Bookmarks ----------
  describe('Bookmarks', () => {
    describe('Get empty bookmarks', () => {
      it('should get empty bookmarks', () => {
        return pactum.spec()
          .get('/bookmarks')
          .withHeaders({ Authorization: 'Bearer $S{userAt}' })
          .expectStatus(200)
          .expectBody([]);
      });
    });

    describe('Create bookmark', () => {
      const dto: CreateBookmarkDto = {
        title: 'First Bookmark',
        link: 'https://www.youtube.com/watch?v=GHTA143_b-s',
      };

      it('should create bookmark', () => {
        return pactum.spec()
          .post('/bookmarks')
          .withHeaders({ Authorization: 'Bearer $S{userAt}' })
          .withBody(dto)
          .expectStatus(201)
          .stores('bookmarkId', 'id');
      });
    });

    describe('Get bookmarks', () => {
      it('should get bookmarks', () => {
        return pactum.spec()
          .get('/bookmarks')
          .withHeaders({ Authorization: 'Bearer $S{userAt}' })
          .expectStatus(200)
          .expectJsonLength(1);
      });
    });

    describe('Get bookmark by id', () => {
      it('should get bookmark by id', () => {
        return pactum.spec()
          .get('/bookmarks/{id}')
          .withPathParams('id', '$S{bookmarkId}')
          .withHeaders({ Authorization: 'Bearer $S{userAt}' })
          .expectStatus(200)
          .expectBodyContains('$S{bookmarkId}');
      });
    });

    describe('Edit bookmark by id', () => {
      const dto: EditBookmarkDto = {
        title: 'NestJS Course for Beginners',
        description: 'Learn NestJS by building a REST API',
      };

      it('should edit bookmark', () => {
        return pactum.spec()
          .patch('/bookmarks/{id}')
          .withPathParams('id', '$S{bookmarkId}')
          .withHeaders({ Authorization: 'Bearer $S{userAt}' })
          .withBody(dto)
          .expectStatus(200)
          .expectBodyContains(dto.title)
          .expectBodyContains(dto.description);
      });
    });

    describe('Delete bookmark by id', () => {
      it('should delete bookmark', () => {
        return pactum.spec()
          .delete('/bookmarks/{id}')
          .withPathParams('id', '$S{bookmarkId}')
          .withHeaders({ Authorization: 'Bearer $S{userAt}' })
          .expectStatus(204);
      });

      it('should get empty bookmarks after delete', () => {
        return pactum.spec()
          .get('/bookmarks')
          .withHeaders({ Authorization: 'Bearer $S{userAt}' })
          .expectStatus(200)
          .expectJsonLength(0);
      });
    });
  });
});
```

---

## Docker Compose

```yaml
# docker-compose.yml
version: '3.8'
services:
  dev-db:
    image: postgres:13
    ports:
      - '5434:5432'
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: 123
      POSTGRES_DB: nest
    networks:
      - freecodecamp

  test-db:
    image: postgres:13
    ports:
      - '5435:5432'
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: 123
      POSTGRES_DB: nest
    networks:
      - freecodecamp

networks:
  freecodecamp:
```

---

## Running the App

```bash
# 1. Start the development database
yarn db:dev:restart

# 2. Start the NestJS server
yarn start:dev

# 3. Run end-to-end tests
yarn test:e2e

# 4. Browse the database visually
npx prisma studio
```

---

## Key Takeaways

- **Modularity**: NestJS separates concerns into feature modules (auth, user, bookmark, prisma)
- **Dependency Injection**: No manual `new` — NestJS manages service lifecycles automatically
- **DTO Validation**: `class-validator` + `ValidationPipe` with `whitelist: true` ensures clean, validated input
- **JWT Auth Flow**: User signs in → receives access token → passes token in `Authorization` header → strategy validates it → route handler executes
- **Ownership Checks**: Always verify the requesting user owns the resource before edit/delete
- **Testing**: A clean test DB is spun up before each E2E test run via `pretest:e2e` hook

---

*Based on the NestJS REST API course by Vladimir (Code With Vlad) on freeCodeCamp.*