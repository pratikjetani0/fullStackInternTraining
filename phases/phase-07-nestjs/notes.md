# NestJS

## What is Nestjs

- It is an open-source, progressive Node.js framework used for building efficient, reliable, and scalable server-side applications
- Typescript fruendly
- modular structure
- uses express js
- uses dependency injection

### Why NestJS?

- Node.js/Express by itself has **no enforced project structure** or best practices, which makes large codebases hard to maintain.
- NestJS borrows its architecture from **Angular**: Controllers, Providers, Modules, Middleware, Exception Filters, Pipes, Guards, Interceptors, and Custom Decorators.
- If you know Angular concepts, NestJS will feel familiar — backend code becomes organized, predictable, and easy for teams to contribute to.
- As your codebase grows, following the NestJS architecture (controllers, providers, modules) keeps things maintainable.

## why use

- structure
- modularity
- typescript
- graphQl
- microservices
- REST api

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

### Pipes & Validation & DTOs

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

### Guards

Guards **allow or block** route execution. Applied with `@UseGuards()`:

```typescript
@UseGuards(JwtGuard)
@Get('me')
getMe() { ... }
```

You can apply guards at the route, controller, or global level.

### Decorators

- `@Controller('songs')` — sets the route prefix (`/songs`)
- `@Get()` — GET endpoint
- `@Post()` — POST endpoint
- `@Put(':id')` — PUT endpoint (update)
- `@Delete(':id')` — DELETE endpoint
- `@Param('id')` — extract a route parameter
- `@Body()` — extract the request body

### Example endpoints built for Songs

| Method | Route        | Purpose           |
| ------ | ------------ | ----------------- |
| GET    | `/songs`     | Fetch all songs   |
| GET    | `/songs/:id` | Fetch one song    |
| POST   | `/songs`     | Create a new song |
| PUT    | `/songs/:id` | Update a song     |
| DELETE | `/songs/:id` | Delete a song     |

### Testing endpoints

The course uses the **REST Client** VS Code extension (alternative to Postman) with `.http` files containing raw HTTP requests.

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

## 7. Middleware

Middleware functions run **before** the route handler executes. They have access to `request`, `response`, and `next()`.

### Use cases

- Logging requests
- Modifying the request object (e.g., adding headers/auth tokens)
- Ending the request/response cycle early

### Class-based middleware

```bash
nest g middleware common/middleware/logger --no-spec --flat
```

## 8. Exception Handling

NestJS has a built-in **HttpException** mechanism. When unhandled errors occur, NestJS returns a `500 Internal Server Error` automatically.

### Custom handling with try/catch + HttpException

```ts
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

## 9. Pipes

Pipes serve two purposes:

1. **Transformation** — convert input data to the desired type
2. **Validation** — validate input data

### Built-in pipes

- `ParseIntPipe` — converts a string route param to a number
  ```ts
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) { ... }
  ```

  - Throws `400 Bad Request` ("Validation failed (numeric string is expected)") for invalid input.
  - Customize the error: `new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE })`
- `ValidationPipe` — used with DTOs (registered globally as shown in section 6)
- `DefaultValuePipe` — provides default query param values (used in pagination)

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

| Method | Path           | Description         | Auth Required |
| ------ | -------------- | ------------------- | ------------- |
| POST   | `/auth/signup` | Register a new user | No            |
| POST   | `/auth/signin` | Login, returns JWT  | No            |

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

---

## Global filter

## Logger 

## Winstone

## Refresh token 
