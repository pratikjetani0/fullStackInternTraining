# NestJS — Complete Notes

## What is NestJS?

- An open-source, progressive Node.js framework used for building efficient, reliable, and scalable server-side applications.
- TypeScript-friendly with a modular structure.
- Built on top of Express.js (under the hood).
- Uses Dependency Injection extensively.

### Why NestJS?

- Node.js/Express by itself has **no enforced project structure** or best practices, which makes large codebases hard to maintain.
- NestJS borrows its architecture from **Angular**: Controllers, Providers, Modules, Middleware, Exception Filters, Pipes, Guards, Interceptors, and Custom Decorators.
- If you know Angular concepts, NestJS will feel familiar — backend code becomes organized, predictable, and easy for teams to contribute to.
- As your codebase grows, following the NestJS architecture (controllers, providers, modules) keeps things maintainable.

### Key Features

- Enforced structure & modularity
- First-class TypeScript support
- GraphQL support
- Microservices support
- REST API support

---

## Core Concepts

### Modules

NestJS organizes applications into **feature modules**. Each module is a class decorated with `@Module()`.

Each NestJS module consists of:

- **providers** — services/classes that can be injected
- **controllers** — handle incoming HTTP requests
- **imports** — other modules this module depends on
- **exports** — providers/controllers this module shares with other modules

```typescript
import { Module } from "@nestjs/common";

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
import { Controller, Get, Post } from "@nestjs/common";

@Controller("auth")
export class AuthController {
  @Post("signup")
  signup() {
    return "I am signed up";
  }

  @Post("signin")
  signin() {
    return "I am signed in";
  }
}
```

### Services (Providers)

Services hold the **business logic** — database queries, hashing, etc. Decorated with `@Injectable()`.

```typescript
import { Injectable } from "@nestjs/common";

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

---

## Pipes, Validation & DTOs

**DTO (Data Transfer Object)** defines the shape of incoming request data.

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
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class AuthDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
```

### Built-in Pipes

- **`ParseIntPipe`** — converts a string route param to a number

  ```typescript
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) { ... }
  ```

  - Throws `400 Bad Request` ("Validation failed (numeric string is expected)") for invalid input.
  - Customize the error: `new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE })`

- **`ValidationPipe`** — used with DTOs (registered globally as shown above)
- **`DefaultValuePipe`** — provides default query param values (used in pagination)

---

## Guards

Guards **allow or block** route execution. Applied with `@UseGuards()`:

```typescript
@UseGuards(JwtGuard)
@Get('me')
getMe() { ... }
```

You can apply guards at the route, controller, or global level.

---

## Decorators

### Standard Decorators

- `@Controller('songs')` — sets the route prefix (`/songs`)
- `@Get()` — GET endpoint
- `@Post()` — POST endpoint
- `@Put(':id')` — PUT endpoint (update)
- `@Delete(':id')` — DELETE endpoint
- `@Param('id')` — extract a route parameter
- `@Body()` — extract the request body

### Custom Decorators

NestJS allows creation of reusable decorators.

```typescript
import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export const GetUser = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user;
    return data ? user[data] : user;
  },
);
```

Usage:

```typescript
// Get the full user object
@Get('me')
getMe(@GetUser() user: User) {
  return user;
}

// Get a specific field
@Get('me')
getEmail(@GetUser('email') email: string) {
  return email;
}
```

---

## Middleware

Middleware functions run **before** the route handler executes. They have access to `request`, `response`, and `next()`.

### Use Cases

- Logging requests
- Modifying the request object (e.g., adding headers/auth tokens)
- Ending the request/response cycle early

### Class-based Middleware

```bash
nest g middleware common/middleware/logger --no-spec --flat
```

---

## Interceptors

Interceptors are used to:

- Transform response data
- Log requests/responses
- Handle exceptions
- Add extra behavior before/after method execution

```typescript
import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from "@nestjs/common";
import { map } from "rxjs/operators";

@Injectable()
export class TransformInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler) {
    return next.handle().pipe(
      map((data) => ({
        success: true,
        data,
      })),
    );
  }
}
```

Apply globally:

```typescript
app.useGlobalInterceptors(new TransformInterceptor());
```

---

## Exception Handling

NestJS has a built-in **HttpException** mechanism. When unhandled errors occur, NestJS returns a `500 Internal Server Error` automatically.

### Custom Handling with try/catch + HttpException

```typescript
async findAll() {
  try {
    return await this.songsRepository.find();
  } catch (error) {
    throw new HttpException('Server Error', HttpStatus.INTERNAL_SERVER_ERROR);
    // or HttpStatus.FORBIDDEN, etc.
  }
}
```

You can pass a custom `cause` (the original error) as part of the exception options.

### Global Exception Filter

Instead of handling errors in every service, create a global exception filter.

Generate:

```bash
nest g filter common/filters/http-exception
```

```typescript
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from "@nestjs/common";

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    const status = exception.getStatus();

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
```

Register globally:

```typescript
app.useGlobalFilters(new HttpExceptionFilter());
```

---

## Configuration Module

NestJS uses dotenv through `ConfigModule`.

Install:

```bash
npm install @nestjs/config
```

Setup:

```typescript
import { ConfigModule } from "@nestjs/config";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
})
export class AppModule {}
```

Usage:

```typescript
constructor(private config: ConfigService) {}

const secret = this.config.get('JWT_SECRET');
```

---

## Prisma Integration

Prisma is commonly used as an ORM with NestJS.

Install:

```bash
npm install prisma --save-dev
npm install @prisma/client
```

Generate Prisma:

```bash
npx prisma init
```

Create Prisma Service:

```typescript
import { Injectable, OnModuleInit } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }
}
```

Register:

```typescript
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
```

Inject:

```typescript
constructor(private prisma: PrismaService) {}
```

Example Query:

```typescript
return this.prisma.user.findMany();
```

---

## Lifecycle Hooks

NestJS provides lifecycle hooks.

### OnModuleInit

Runs when a module initializes.

```typescript
export class PrismaService implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }
}
```

### OnModuleDestroy

Runs when a module is destroyed.

```typescript
async onModuleDestroy() {
  await this.$disconnect();
}
```

---

## Logging

### Built-in Logger

NestJS provides a built-in logger.

```typescript
import { Logger } from "@nestjs/common";

const logger = new Logger("AuthService");

logger.log("User created");
logger.warn("Password weak");
logger.error("Database error");
```

Methods:

```typescript
logger.log();
logger.warn();
logger.error();
logger.debug();
logger.verbose();
```

### Winston Logger

Winston is widely used for production logging.

Install:

```bash
npm install nest-winston winston
```

Configuration:

```typescript
import * as winston from "winston";

WinstonModule.forRoot({
  transports: [new winston.transports.Console()],
});
```

Benefits:

- File logging
- Daily rotation
- Structured logs
- Better production monitoring

---

## Authentication

### JWT Strategy

The strategy validates the JWT from the `Authorization: Bearer <token>` header, finds the user in the DB, and attaches it to `req.user`.

### Auth Guard

A custom guard wraps `AuthGuard('jwt')` from Passport for clean usage.

### Custom Decorator

`@GetUser()` extracts the user (or a specific field) from the request object, set by the JWT strategy.

### Refresh Token Authentication

#### Why Refresh Tokens?

Access tokens expire quickly.

Example:

- Access Token → 15 minutes
- Refresh Token → 7 days

Flow:

```text
Login
  ↓
Access Token + Refresh Token
  ↓
Access Token Expired
  ↓
Send Refresh Token
  ↓
Generate New Access Token
```

#### Login Response

```json
{
  "access_token": "...",
  "refresh_token": "..."
}
```

#### Refresh Endpoint

```http
POST /auth/refresh
```

Request:

```json
{
  "refreshToken": "..."
}
```

Response:

```json
{
  "access_token": "new_token"
}
```

---

## Swagger Documentation

Swagger automatically generates API documentation.

Install:

```bash
npm install @nestjs/swagger swagger-ui-express
```

Setup:

```typescript
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";

const config = new DocumentBuilder()
  .setTitle("Bookmarks API")
  .setDescription("API Documentation")
  .setVersion("1.0")
  .build();

const document = SwaggerModule.createDocument(app, config);

SwaggerModule.setup("api", app, document);
```

Visit:

```text
http://localhost:3000/api
```

---

## Caching

Install:

```bash
npm install cache-manager
```

Example:

```typescript
@UseInterceptors(CacheInterceptor)
@Get()
findAll() {
  return this.service.findAll();
}
```

Benefits:

- Faster response times
- Reduced database load

---

## Rate Limiting

Protect APIs from abuse.

Install:

```bash
npm install @nestjs/throttler
```

Setup:

```typescript
ThrottlerModule.forRoot([
  {
    ttl: 60000,
    limit: 10,
  },
]);
```

Apply:

```typescript
@UseGuards(ThrottlerGuard)
```

Meaning:

```text
10 requests per minute
```

---

## Testing

### Unit Test

Test service logic only.

Generate:

```bash
nest g service auth
```

Test file:

```typescript
describe("AuthService", () => {
  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
```

Run:

```bash
npm run test
```

### E2E Testing

Tests the complete API flow.

Run:

```bash
npm run test:e2e
```

Example:

```typescript
request(app.getHttpServer()).post("/auth/signup").send(dto).expect(201);
```

---

## Testing Endpoints Manually

The course uses the **REST Client** VS Code extension (alternative to Postman) with `.http` files containing raw HTTP requests.

---

## Useful Nest CLI Commands

```bash
# Create Project
nest new project-name

# Generate Module
nest g module auth

# Generate Controller
nest g controller auth --no-spec

# Generate Service
nest g service auth --no-spec

# Generate Guard
nest g guard auth/guards/jwt --no-spec

# Generate Middleware
nest g middleware common/logger --no-spec

# Generate Filter
nest g filter common/http-exception --no-spec

# Generate Interceptor
nest g interceptor common/transform --no-spec
```

---

## NestJS Request Lifecycle

```text
Incoming Request
      │
      ▼
Middleware
      │
      ▼
Guards
      │
      ▼
Interceptors (Before)
      │
      ▼
Pipes
      │
      ▼
Controller
      │
      ▼
Service
      │
      ▼
Interceptors (After)
      │
      ▼
Response
```

If an error occurs:

```text
Exception Filter
      │
      ▼
Formatted Error Response
```

---

## NestJS Architecture Flow

```text
Module
│
├── Controller
│       │
│       ▼
│   Service
│       │
│       ▼
│   Prisma
│       │
│       ▼
│   Database
│
└── Providers
```

This architecture makes NestJS highly scalable, maintainable, and suitable for enterprise-level backend applications.

---

## Example Project: Bookmarks API

### Auth Routes

| Method | Path            | Description             | Auth Required |
| ------ | --------------- | ----------------------- | ------------- |
| POST   | `/auth/signup`  | Register a new user     | No            |
| POST   | `/auth/signin`  | Login, returns JWT      | No            |
| POST   | `/auth/refresh` | refresh token           | No            |
| POST   | `/auth/logout`  | Logout, returns message | Yes           |

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

| Method | Path        | Description       | Auth Required |
| ------ | ----------- | ----------------- | ------------- |
| GET    | `/users/me` | Get current user  | Yes           |
| PATCH  | `/users`    | Edit current user | Yes           |

**Edit User request body (all optional):**

```json
{
  "email": "newemail@example.com",
  "firstName": "John",
  "lastName": "Doe"
}
```

### Bookmark Routes

| Method | Path             | Description            | Auth Required |
| ------ | ---------------- | ---------------------- | ------------- |
| GET    | `/bookmarks`     | Get all user bookmarks | Yes           |
| POST   | `/bookmarks`     | Create a bookmark      | Yes           |
| GET    | `/bookmarks/:id` | Get bookmark by ID     | Yes           |
| PATCH  | `/bookmarks/:id` | Edit bookmark by ID    | Yes           |
| DELETE | `/bookmarks/:id` | Delete bookmark by ID  | Yes           |

**Create Bookmark request body:**

```json
{
  "title": "My First Bookmark",
  "link": "https://www.freecodecamp.org",
  "description": "Optional description"
}
```
