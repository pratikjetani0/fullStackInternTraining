# NestJS Fundamentals — Building a Spotify Clone Backend

A complete course README covering everything taught: building a Spotify-clone backend with NestJS, TypeORM/Postgres, MongoDB, Prisma, GraphQL, authentication, testing, deployment, and advanced features (queues, events, cron, sessions, streaming, file uploads).

---

## Table of Contents

1. [Introduction to NestJS](#1-introduction-to-nestjs)
2. [Project Setup](#2-project-setup)
3. [Modules](#3-modules)
4. [Controllers](#4-controllers)
5. [Services & Providers](#5-services--providers)
6. [DTOs & Validation](#6-dtos--validation)
7. [Middleware](#7-middleware)
8. [Exception Handling](#8-exception-handling)
9. [Pipes](#9-pipes)
10. [Dependency Injection Techniques](#10-dependency-injection-techniques)
11. [Injection Scopes](#11-injection-scopes)
12. [Database Relations (TypeORM)](#12-database-relations-typeorm)
13. [Connecting to PostgreSQL with TypeORM](#13-connecting-to-postgresql-with-typeorm)
14. [Entities & CRUD with TypeORM Repositories](#14-entities--crud-with-typeorm-repositories)
15. [Pagination](#15-pagination)
16. [One-to-One, Many-to-Many Relations](#16-one-to-one-many-to-many-relations)
17. [Authentication](#17-authentication)
18. [Role-Based Authentication (Artist Guard)](#18-role-based-authentication-artist-guard)
19. [Two-Factor Authentication (2FA)](#19-two-factor-authentication-2fa)
20. [API Key Authentication](#20-api-key-authentication)
21. [Debugging in VS Code](#21-debugging-in-vs-code)
22. [Migrations](#22-migrations)
23. [Data Seeding](#23-data-seeding)
24. [Configuration Management](#24-configuration-management)
25. [Hot Module Reloading with Webpack](#25-hot-module-reloading-with-webpack)
26. [Swagger / OpenAPI Documentation](#26-swagger--openapi-documentation)
27. [MongoDB with Mongoose](#27-mongodb-with-mongoose)
28. [Deployment to Railway](#28-deployment-to-railway)
29. [Testing (Jest, Unit & E2E)](#29-testing-jest-unit--e2e)
30. [NestJS Version 10 (SWC Compiler)](#30-nestjs-version-10-swc-compiler)
31. [WebSockets](#31-websockets)
32. [GraphQL](#32-graphql)
33. [Prisma ORM](#33-prisma-orm)
34. [File Upload](#34-file-upload)
35. [Custom Decorators](#35-custom-decorators)
36. [Cron Jobs / Task Scheduling](#36-cron-jobs--task-scheduling)
37. [Cookies](#37-cookies)
38. [Queues (Bull + Redis)](#38-queues-bull--redis)
39. [Event Emitter](#39-event-emitter)
40. [Streaming Files](#40-streaming-files)
41. [Sessions](#41-sessions)

---

## 1. Introduction to NestJS

**NestJS** is a framework for building efficient, scalable Node.js server-side applications. It is built on top of **Node.js**, **Express.js**, and **TypeScript**.

### Why NestJS?
- Node.js/Express by itself has **no enforced project structure** or best practices, which makes large codebases hard to maintain.
- NestJS borrows its architecture from **Angular**: Controllers, Providers, Modules, Middleware, Exception Filters, Pipes, Guards, Interceptors, and Custom Decorators.
- If you know Angular concepts, NestJS will feel familiar — backend code becomes organized, predictable, and easy for teams to contribute to.
- As your codebase grows, following the NestJS architecture (controllers, providers, modules) keeps things maintainable.

### What you'll build
A backend for a **Spotify clone** that includes:
- Database design (Postgres via TypeORM, MongoDB via Mongoose, Prisma ORM)
- REST APIs (songs, playlists, artists, users, albums)
- GraphQL APIs
- Authentication (JWT, 2FA, API keys, role-based access)
- Deployment to production (Railway)

---

## 2. Project Setup

1. Install the NestJS CLI globally:
   ```bash
   npm i -g @nestjs/cli
   ```
2. Create a new project:
   ```bash
   nest new nest-fundamentals-pro
   ```
   Choose your package manager (npm).
3. Open the project in VS Code.
4. Run in development mode:
   ```bash
   npm run start:dev
   ```
5. By default NestJS runs on **port 3000** (configured in `main.ts`).
6. Visiting `http://localhost:3000` returns "Hello World" from `AppController`'s `getHello()` method (defined in `app.service.ts`).

### Project structure
- `src/` — all source code
- `main.ts` — entry point; calls `bootstrap()` which creates the app via `NestFactory.create(AppModule)` and listens on a port
- `app.module.ts` — the **root module**
- `app.controller.ts` / `app.service.ts` — default controller + service
- `test/` — e2e test specs
- `*.spec.ts` files — unit test files colocated with source
- `.eslintrc`, `.prettierrc`, `nest-cli.json`, `package.json`, `tsconfig.json`, `tsconfig.build.json` — config files

---

## 3. Modules

Each NestJS module consists of:
- **providers** — services/classes that can be injected
- **controllers** — handle incoming HTTP requests
- **imports** — other modules this module depends on
- **exports** — providers/controllers this module shares with other modules

### Root Module
Every app has one root module (`AppModule`) — the entry point, responsible for bootstrapping and assembling the rest of the app. NestJS encourages **module isolation**: organize the app into feature modules.

### Spotify Clone Modules
- `SongsModule` — handle song-related functionality
- `ArtistModule` — handle artist functionality
- `AuthModule` — handle authentication
- `PlaylistsModule`, `UsersModule`, `AlbumsModule` — additional feature modules

### Generating a module via CLI
```bash
nest g module songs
```
This automatically registers the new module in `AppModule`'s `imports` array.

---

## 4. Controllers

Controllers handle incoming requests and send responses back to the client.

### Generate a controller
```bash
nest generate controller songs
```

### Decorators
- `@Controller('songs')` — sets the route prefix (`/songs`)
- `@Get()` — GET endpoint
- `@Post()` — POST endpoint
- `@Put(':id')` — PUT endpoint (update)
- `@Delete(':id')` — DELETE endpoint
- `@Param('id')` — extract a route parameter
- `@Body()` — extract the request body

### Example endpoints built for Songs
| Method | Route | Purpose |
|---|---|---|
| GET | `/songs` | Fetch all songs |
| GET | `/songs/:id` | Fetch one song |
| POST | `/songs` | Create a new song |
| PUT | `/songs/:id` | Update a song |
| DELETE | `/songs/:id` | Delete a song |

### Testing endpoints
The course uses the **REST Client** VS Code extension (alternative to Postman) with `.http` files containing raw HTTP requests.

---

## 5. Services & Providers

- Services are **providers** — injectable classes (`@Injectable()`) responsible for business logic, DB access, etc.
- A service can be injected into a controller (or another service) via **constructor-based dependency injection**.
- Generate a service:
  ```bash
  nest g service songs
  ```
- Initially, the service stored songs in a private in-memory array (`private songs = []`) with `create()` and `findAll()` methods — later replaced by real DB access (TypeORM repository).

---

## 6. DTOs & Validation

**DTO (Data Transfer Object)** defines the shape of incoming request data.

### Install validation packages
```bash
npm i class-validator class-transformer
```

### Register the global validation pipe (in `main.ts`)
```ts
app.useGlobalPipes(new ValidationPipe());
```

### Example: `create-song.dto.ts`
```ts
import { IsString, IsNotEmpty, IsArray, IsDateString, IsMilitaryTime } from 'class-validator';

export class CreateSongDto {
  @IsString()
  @IsNotEmpty()
  readonly title: string;

  @IsArray()
  @IsString({ each: true })
  @IsNotEmpty()
  readonly artist: string[];

  @IsDateString()
  @IsNotEmpty()
  readonly releaseDate: string;

  @IsMilitaryTime()
  @IsNotEmpty()
  readonly duration: string;

  @IsString()
  readonly lyrics?: string; // optional
}
```

Apply the DTO to the controller's create endpoint:
```ts
@Post()
create(@Body() createSongDto: CreateSongDto) {
  return this.songService.create(createSongDto);
}
```

Validation errors automatically return messages like:
- `"title should not be empty"`
- `"title must be a string"`
- `"artist should not be empty"`
- `"date must be a valid ISO 8601 date string"`
- `"duration must be a valid representation of military time"`

For updates, an `UpdateSongDto` is created with **all fields optional** (`@IsOptional()`).

---

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

```ts
@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log(`Request...`, new Date().toISOString());
    next();
  }
}
```

### Applying middleware (in `AppModule`)
```ts
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes('songs'); // option 1: apply to a path

    // option 2: apply to a path + method
    consumer
      .apply(LoggerMiddleware)
      .forRoutes({ path: 'songs', method: RequestMethod.POST });

    // option 3: apply to a controller
    consumer
      .apply(LoggerMiddleware)
      .forRoutes(SongsController);
  }
}
```

---

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

---

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

## 10. Dependency Injection Techniques

NestJS supports several provider registration patterns:

### 1. Standard provider
```ts
providers: [SongService]
// equivalent to:
providers: [{ provide: SongService, useClass: SongService }]
```

### 2. Value provider (`useValue`)
Useful for mocks, constants, or external libraries:
```ts
providers: [{ provide: SongService, useValue: mockSongService }]
```

### 3. Non-class-based provider (constant object via `useValue`)
```ts
export const connection = { connString: '...', user: '...', password: '...' };

providers: [{ provide: 'CONNECTION', useValue: connection }]
```
Inject with `@Inject('CONNECTION') private connection`.

### 4. Class-based provider (`useClass`)
```ts
providers: [{ provide: DevConfigService, useClass: DevConfigService }]
```

### 5. Factory provider (`useFactory`)
Choose an implementation conditionally (e.g., based on environment):
```ts
providers: [{
  provide: 'CONFIG',
  useFactory: () => (process.env.NODE_ENV === 'development' ? devConfig : prodConfig),
}]
```
Inject with `@Inject('CONFIG') private config`.

---

## 11. Injection Scopes

- **DEFAULT (Singleton)** — one shared instance across the whole app (best performance, recommended for most cases). Nest caches the instance.
- **REQUEST** — a new instance is created per incoming request.
- **TRANSIENT** — a new instance is created for every consumer that injects it.

```ts
@Injectable({ scope: Scope.REQUEST }) // or Scope.TRANSIENT
export class SongService { ... }
```
Using non-default scopes can reduce performance — use only when necessary.

---

## 12. Database Relations (TypeORM)

### One-to-Many / Many-to-One
Example: a **Playlist** can contain many **Songs**, and a **User** can have many **Playlists**.

```ts
// playlist.entity.ts
@OneToMany(() => Song, (song) => song.playlist)
songs: Song[];

@ManyToOne(() => User, (user) => user.playlists)
user: User;

// song.entity.ts
@ManyToOne(() => Playlist, (playlist) => playlist.songs)
playlist: Playlist;

// user.entity.ts
@OneToMany(() => Playlist, (playlist) => playlist.user)
playlists: Playlist[];
```

This creates a `playlistId` foreign key on the `playlist` table (referencing `user`) and a `playlistId` foreign key on `song` (referencing `playlist`).

### Creating the Playlist module
```bash
nest g module playlists
nest g controller playlists
nest g service playlists
```

`CreatePlaylistDto`:
```ts
export class CreatePlaylistDto {
  name: string;
  songs: number[]; // song IDs
  user: number;    // user ID
}
```

The playlist service:
1. Creates a new `Playlist` entity instance.
2. Sets `name`.
3. Looks up `Song` entities by IDs and assigns to `playlist.songs`.
4. Looks up the `User` and assigns to `playlist.user`.
5. Saves via `playlistRepository.save(playlist)`.

---

## 13. Connecting to PostgreSQL with TypeORM

### Install dependencies
```bash
npm i @nestjs/typeorm pg typeorm
npm i -D @types/node
```

### Register `TypeOrmModule` in `AppModule`
```ts
TypeOrmModule.forRoot({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'root',
  database: 'spotify_clone',
  entities: [],
  synchronize: true, // ⚠️ never use in production — drops/recreates schema
})
```

### Verify the connection
Inject `DataSource` and log `dataSource.driver.database`.

### Tooling
- **pgAdmin 4** — GUI for managing the Postgres database, viewing tables, running queries.

---

## 14. Entities & CRUD with TypeORM Repositories

### Entity example: `song.entity.ts`
```ts
@Entity('songs')
export class Song {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column('varchar', { array: true })
  artist: string[];

  @Column('date')
  releaseDate: string;

  @Column('time')
  duration: string;

  @Column('text', { nullable: true })
  lyrics: string;
}
```
Register the entity in `entities: [Song]` (in `TypeOrmModule.forRoot`/`forFeature`).

### Register repository in the feature module
```ts
@Module({
  imports: [TypeOrmModule.forFeature([Song])],
  controllers: [SongsController],
  providers: [SongService],
})
export class SongsModule {}
```

### Inject the repository
```ts
constructor(
  @InjectRepository(Song) private songsRepository: Repository<Song>,
) {}
```

### CRUD methods
```ts
create(createSongDto: CreateSongDto): Promise<Song> {
  const song = new Song();
  song.title = createSongDto.title;
  song.artist = createSongDto.artist;
  song.duration = createSongDto.duration;
  song.lyrics = createSongDto.lyrics;
  song.releaseDate = createSongDto.releaseDate;
  return this.songsRepository.save(song);
}

findAll(): Promise<Song[]> {
  return this.songsRepository.find();
}

findOne(id: number): Promise<Song> {
  return this.songsRepository.findOne({ where: { id } });
}

remove(id: number) {
  return this.songsRepository.delete(id);
}

update(id: number, updateSongDto: UpdateSongDto) {
  return this.songsRepository.update(id, updateSongDto);
}
```

---

## 15. Pagination

### Install
```bash
npm i nestjs-typeorm-paginate
```

### Service method
```ts
async paginate(options: IPaginationOptions): Promise<Pagination<Song>> {
  return paginate<Song>(this.songsRepository, options);
}
```

### Controller
```ts
@Get()
findAll(
  @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
  @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
): Promise<Pagination<Song>> {
  limit = limit > 100 ? 100 : limit;
  return this.songService.paginate({ page, limit });
}
```

### Sorting with QueryBuilder
```ts
const queryBuilder = this.songsRepository.createQueryBuilder('c');
queryBuilder.orderBy('c.releaseDate', 'DESC');
return paginate<Song>(queryBuilder, options);
```

The response includes: `items`, `meta` (`totalItems`, `itemCount`, `itemsPerPage`, `totalPages`, `currentPage`).

---

## 16. One-to-One, Many-to-Many Relations

### One-to-One (Artist ↔ User)
A `User` can become an `Artist`; one user has one artist profile.

```ts
// artist.entity.ts
@OneToOne(() => User)
@JoinColumn()
user: User;
```
This adds a `userId` foreign key column to the `artist` table.

### Many-to-Many (Artists ↔ Songs)
Many artists can publish many songs, and a song can have multiple artists.

```ts
// artist.entity.ts
@ManyToMany(() => Song, (song) => song.artist)
@JoinTable() // creates the join table
songs: Song[];

// song.entity.ts
@ManyToMany(() => Artist, (artist) => artist.songs, { cascade: true })
artist: Artist[];
```
This generates a join table (e.g., `songs_artists`) holding the foreign keys of both `song` and `artist`.

### Refactoring `CreateSongDto` for many-to-many
```ts
export class CreateSongDto {
  // ... other fields
  @IsArray()
  @IsNotEmpty({ each: true })
  artist: number[]; // artist IDs
}
```

### Service logic
```ts
async create(createSongDto: CreateSongDto) {
  const artists = await this.artistRepository.findBy({
    id: In(createSongDto.artist),
  });

  const song = new Song();
  // ...assign other fields
  song.artist = artists;

  return this.songsRepository.save(song);
}
```
Register `Artist` entity inside `SongsModule`'s `TypeOrmModule.forFeature([Song, Artist])` so the artist repository can be injected into `SongService`.

---

## 17. Authentication

### Packages
```bash
npm i bcryptjs
npm i -D @types/bcryptjs
npm i @nestjs/jwt @nestjs/passport passport passport-jwt
npm i -D @types/passport-jwt
```

### Modules created
- `AuthModule` (with `AuthController`, `AuthService`)
- `UsersModule` (with `UserService`, registers `User` entity)

### Sign Up Flow
1. `CreateUserDto` — `firstName`, `lastName`, `email`, `password`.
2. `UserService.create()`:
   - Generate a salt: `bcrypt.genSalt()`
   - Hash password: `bcrypt.hash(password, salt)`
   - Save the user via the repository
   - Delete `password` from the returned object before responding
3. The `User` entity sets `email` to `unique: true`, and `password` column uses `select: false` to exclude it from query results by default.
4. `AuthController` exposes `POST /auth/signup`.

### Login Flow & JWT
1. `LoginDto` — `email`, `password`.
2. `AuthService.login()`:
   - Find user by email (`UserService.findOne()`); throw `UnauthorizedException` if not found.
   - Compare passwords with `bcrypt.compare(plainPassword, hashedPassword)`.
   - If they match, generate a JWT via `JwtService.sign(payload)` where `payload = { email, sub: user.id }`.
   - If not, throw `UnauthorizedException`.
3. Register `JwtModule` (with secret and expiry) inside `AuthModule`.
4. `auth.constants.ts` stores the JWT secret (later moved to environment variables).

### JWT Strategy & Guard
```ts
// jwt.strategy.ts
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }
  async validate(payload: any) {
    return { userId: payload.sub, email: payload.email };
  }
}

// jwt-auth.guard.ts
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}
```

### Protecting routes
```ts
@UseGuards(JwtAuthGuard)
@Get('profile')
getProfile(@Request() req) {
  return req.user;
}
```
Send requests with `Authorization: Bearer <token>`.

---

## 18. Role-Based Authentication (Artist Guard)

Use case: only **artists** can create songs (like real Spotify — only approved artists can upload).

### Steps
1. Create `ArtistModule`, `ArtistService`, `ArtistController`.
2. `ArtistService.findArtist(userId)` — finds the artist record by user ID.
3. In `AuthService.login()`, if the user is an artist, add `artistId` to the JWT payload.
4. Define a `PayloadType` (`{ userId, email, artistId? }`).
5. Create `ArtistJwtGuard` extending `AuthGuard('jwt')`:
   ```ts
   @Injectable()
   export class ArtistJwtGuard extends AuthGuard('jwt') {
     canActivate(context: ExecutionContext) {
       return super.canActivate(context);
     }
     handleRequest(err, user, info) {
       if (err || !user || !user.artistId) {
         throw new UnauthorizedException();
       }
       return user;
     }
   }
   ```
6. Apply `@UseGuards(ArtistJwtGuard)` on `POST /songs` (create song).
7. To make a user an artist, manually insert a row into the `artist` table with the `userId` foreign key (or build an admin endpoint).

---

## 19. Two-Factor Authentication (2FA)

### Flow
1. User logs in with username/password.
2. If 2FA is enabled, the response indicates 2FA is required (instead of returning the access token directly).
3. User submits the OTP from their authenticator app.
4. Server validates the OTP and returns the access token.

### Packages
```bash
npm i speakeasy
npm i -D @types/speakeasy
```

### Database changes (`User` entity)
```ts
@Column({ nullable: true })
twoFASecret: string;

@Column({ default: false })
isTwoFAEnabled: boolean;
```

### Enable 2FA
```ts
async enableTwoFactorAuth(userId: number) {
  const user = await this.userService.findById(userId);
  if (user.isTwoFAEnabled) return { secret: user.twoFASecret };

  const secret = speakeasy.generateSecret();
  await this.userService.setTwoFactorAuthSecret(secret.base32, userId);
  return { secret: secret.base32 };
}
```
- Endpoint: `GET /auth/enable-2fa` (protected by `JwtAuthGuard`).
- The returned `base32` secret can be entered manually into Google Authenticator (or via a generated `otpauth://` QR code).

### Validate 2FA token
```ts
async validate2FAToken(userId: number, token: string) {
  const user = await this.userService.findById(userId);
  const verified = speakeasy.totp.verify({
    secret: user.twoFASecret,
    encoding: 'base32',
    token,
  });
  return { verified };
}
```
- Endpoint: `POST /auth/validate-2fa` with `ValidateTokenDto { token }`.

### Disable 2FA
```ts
async disable2FA(userId: number) {
  await this.userService.setTwoFactorAuth(userId, false);
  await this.userService.setTwoFactorAuthSecret(null, userId); // optional: clear secret
}
```
- Endpoint: `GET /auth/disable-2fa`.

### Login with 2FA enabled
If `user.isTwoFAEnabled && user.twoFASecret`, return a different response (e.g., a "please validate your 2FA token" message/link) instead of the access token.

---

## 20. API Key Authentication

Use cases: rate limiting, usage tracking, multi-app access.

### Packages
```bash
npm i uuid
npm i passport-http-bearer
npm i -D @types/passport-http-bearer
```

### Database
Add `apiKey: string` column to `User` entity (generated via `uuid()` on signup).

### API Key Strategy
```ts
@Injectable()
export class ApiKeyStrategy extends PassportStrategy(Strategy, 'bearer') {
  constructor(private authService: AuthService) {
    super();
  }
  async validate(apiKey: string) {
    return this.authService.validateApiKey(apiKey);
  }
}
```
Register `ApiKeyStrategy` as a provider in `AuthModule`.

### Validate user by API key
```ts
async validateApiKey(apiKey: string) {
  const user = await this.userService.findByApiKey(apiKey);
  if (!user) throw new UnauthorizedException();
  delete user.password;
  return user;
}
```

### Protected route
```ts
@UseGuards(AuthGuard('bearer'))
@Get('profile-api-key')
getProfileWithApiKey(@Request() req) {
  return { message: 'Authenticated with API key', user: req.user };
}
```
Send requests with `Authorization: Bearer <api-key>`.

---

## 21. Debugging in VS Code

Create `.vscode/launch.json` with a Node.js attach configuration. Run:
```bash
npm run start:debug
```
Then attach the debugger from the **Run and Debug** panel. Set breakpoints in controllers/services/strategies; inspect `request`, `request.user`, variables, and step through code (step over / step into / step out).

---

## 22. Migrations

Migrations are version control for your database schema — a set of files containing SQL instructions to create/modify/delete tables.

### Setup
1. Move TypeORM config into `db/data-source.ts`:
   ```ts
   export const dataSourceOptions: DataSourceOptions = {
     type: 'postgres',
     host: '...',
     port: 5432,
     username: '...',
     password: '...',
     database: '...',
     entities: ['dist/**/*.entity.js'],
     migrations: ['dist/db/migrations/*.js'],
     synchronize: false, // important for production
   };

   const dataSource = new DataSource(dataSourceOptions);
   export default dataSource;
   ```
2. Refactor `AppModule` to use `TypeOrmModule.forRoot(dataSourceOptions)`.
3. Add scripts to `package.json`:
   ```json
   {
     "scripts": {
       "typeorm": "npm run build && npx typeorm -d dist/db/data-source.js",
       "migration:generate": "npm run typeorm -- migration:generate",
       "migration:run": "npm run typeorm -- migration:run",
       "migration:revert": "npm run typeorm -- migration:revert"
     }
   }
   ```

### Workflow
1. Make a change to an entity (add/remove a column).
2. Generate a migration:
   ```bash
   npm run migration:generate db/migrations/AddUserPhone
   ```
3. Run the migration:
   ```bash
   npm run migration:run
   ```
4. To undo:
   ```bash
   npm run migration:revert
   ```

`synchronize: false` is required in production — schema changes must go through migrations.

---

## 23. Data Seeding

Seeding populates the database with initial/fake data (useful for development/testing).

### Package
```bash
npm i @faker-js/faker
```

### Structure
- `db/seeds/data.seed.ts` — defines seed functions (`seedUsers`, `seedArtists`, `seedPlaylists`, etc.) using Faker for fake names/emails.
- `SeedModule` + `SeedService` — uses `DataSource`/`EntityManager` and a **QueryRunner transaction**:
  ```ts
  const queryRunner = this.dataSource.createQueryRunner();
  await queryRunner.connect();
  await queryRunner.startTransaction();
  try {
    await seedData(queryRunner.manager);
    await queryRunner.commitTransaction();
  } catch (err) {
    await queryRunner.rollbackTransaction();
  } finally {
    await queryRunner.release();
  }
  ```
- Called from `main.ts` on bootstrap (commented out / toggle-able once you've seeded enough data, to avoid duplicating records on every restart).

For larger datasets, use Faker in a loop to generate many rows.

---

## 24. Configuration Management

### Package
```bash
npm i @nestjs/config
```

### Setup
1. Create environment files at the project root:
   - `.env.development`
   - `.env.production`
   - **Never commit these** — add to `.gitignore`.
2. Register `ConfigModule` (made global so it doesn't need re-importing in every module):
   ```ts
   ConfigModule.forRoot({
     isGlobal: true,
     envFilePath: ['.env.development', '.env.production'],
     load: [configuration],
     validate,
   })
   ```
3. Custom configuration file `src/config/configuration.ts`:
   ```ts
   export default () => ({
     port: parseInt(process.env.PORT, 10) || 3000,
     database: {
       host: process.env.DB_HOST,
       port: parseInt(process.env.DB_PORT, 10),
       username: process.env.DB_USERNAME,
       password: process.env.DB_PASSWORD,
       name: process.env.DB_NAME,
     },
     secret: process.env.SECRET,
   });
   ```

### Using `ConfigService`
```ts
constructor(private configService: ConfigService) {}

getEnvVariable() {
  return this.configService.get<number>('port');
}
```

### `main.ts`
```ts
const configService = app.get(ConfigService);
const port = configService.get<number>('port');
await app.listen(port);
```

### Async TypeORM config
```ts
export const typeOrmAsyncConfig: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: (configService: ConfigService) => ({
    type: 'postgres',
    host: configService.get('database.host'),
    port: configService.get('database.port'),
    username: configService.get('database.username'),
    password: configService.get('database.password'),
    database: configService.get('database.name'),
    entities: [...],
    synchronize: false,
  }),
};

// app.module.ts
TypeOrmModule.forRootAsync(typeOrmAsyncConfig)
```

### Async JWT config (in `AuthModule`)
```ts
JwtModule.registerAsync({
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: (configService: ConfigService) => ({
    secret: configService.get<string>('secret'),
    signOptions: { expiresIn: '1d' },
  }),
})
```

### Environment Variable Validation
Create `env.validation.ts`:
```ts
enum Environment {
  Development = 'development',
  Production = 'production',
  Test = 'test',
  Provision = 'provision',
}

class EnvironmentVariables {
  @IsEnum(Environment)
  NODE_ENV: Environment;

  @IsNumber()
  PORT: number;

  @IsString()
  DB_HOST: string;

  // ...DB_PORT, DB_USERNAME, DB_PASSWORD, DB_NAME, SECRET
}

export function validate(config: Record<string, unknown>) {
  const validatedConfig = plainToInstance(EnvironmentVariables, config, {
    enableImplicitConversion: true,
  });
  const errors = validateSync(validatedConfig, { skipMissingProperties: false });
  if (errors.length > 0) {
    throw new Error(errors.toString());
  }
  return validatedConfig;
}
```
Pass `validate` into `ConfigModule.forRoot({ validate, ... })`. If a required env var is missing or has the wrong type, the app fails fast at startup with a clear error.

---

## 25. Hot Module Reloading with Webpack

Default `npm run start:dev` reload times can be slow (~30 seconds) on large projects. Speed it up with Webpack HMR.

### Steps
1. Create `webpack-hmr.config.js` at the project root (standard NestJS HMR config snippet).
2. In `main.ts`, add HMR support:
   ```ts
   declare const module: any;

   if (module.hot) {
     module.hot.accept();
     module.hot.dispose(() => app.close());
   }
   ```
3. Update the `start:dev` script to use Webpack:
   ```json
   "start:dev": "nest build --webpack --webpackPath webpack-hmr.config.js --watch"
   ```
4. Install the Webpack plugin as a dependency (not devDependency):
   ```bash
   npm i -D webpack-node-externals
   ```

> ⚠️ **Caveat**: TypeORM's `entities` glob pattern (`dist/**/*.entity.js`) doesn't work well with Webpack HMR — register entities **explicitly** as an array of entity classes instead. This works fine with migrations.

> ⚠️ Don't save files while the project is in an error state — it can break the HMR watcher.

---

## 26. Swagger / OpenAPI Documentation

### Package
```bash
npm i @nestjs/swagger
```

### Setup in `main.ts`
```ts
const config = new DocumentBuilder()
  .setTitle('Spotify Clone')
  .setDescription('API documentation for the Spotify Clone backend')
  .setVersion('1.0')
  .addBearerAuth({
    type: 'http',
    scheme: 'bearer',
    bearerFormat: 'JWT',
    name: 'JWT',
    description: 'Enter JWT token',
    in: 'header',
  }, 'JWT')
  .build();

const document = SwaggerModule.createDocument(app, config);
SwaggerModule.setup('api', app, document);
```
Visit `http://localhost:3000/api` for the Swagger UI.

### Decorating routes
```ts
@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  @Post('signup')
  @ApiOperation({ summary: 'Register a new user' })
  @ApiResponse({ status: 201, description: 'User registered', type: User })
  signup(@Body() dto: CreateUserDto) { ... }

  @ApiBearerAuth('JWT')
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) { ... }
}
```

### Showing DTO/entity schema
- Add `@ApiProperty()` decorators to entity/DTO fields, **or**
- Enable the **Swagger CLI plugin** in `nest-cli.json`:
  ```json
  {
    "compilerOptions": {
      "plugins": ["@nestjs/swagger"]
    }
  }
  ```
  This auto-generates schema metadata without manual `@ApiProperty()` on every field.

### Testing auth in Swagger UI
Click **Authorize**, paste the JWT (obtained via `/auth/login`), and Swagger automatically attaches `Authorization: Bearer <token>` to subsequent requests on protected routes.

---

## 27. MongoDB with Mongoose

### Run MongoDB via Docker Compose
```yaml
version: '3'
services:
  mongodb:
    image: mongo:latest
    ports:
      - 27017:27017
    environment:
      MONGO_INITDB_DATABASE: spotify_clone
```
```bash
docker compose up
```
Use **MongoDB Compass** as a GUI to inspect databases/collections.

### Packages
```bash
npm i @nestjs/mongoose mongoose
```

### Connect (in `AppModule`)
```ts
MongooseModule.forRoot('mongodb://localhost:27017/spotify_clone')
```

### Define a schema
```ts
@Schema()
export class Song {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  releaseDate: string;

  @Prop({ required: true })
  duration: string;

  @Prop()
  lyrics: string;
}

export type SongDocument = HydratedDocument<Song>;
export const SongSchema = SchemaFactory.createForClass(Song);
```
This results in a `songs` collection (Mongoose pluralizes the class name).

### Register & inject the model
```ts
// songs.module.ts
MongooseModule.forFeature([{ name: Song.name, schema: SongSchema }])

// songs.service.ts
constructor(@InjectModel(Song.name) private songModel: Model<SongDocument>) {}

create(dto: CreateSongDto) {
  const song = new this.songModel(dto);
  return song.save();
}

findAll() {
  return this.songModel.find();
}

findOne(id: string) {
  return this.songModel.findById(id);
}

remove(id: string) {
  return this.songModel.deleteOne({ _id: id });
}
```
> Mongo uses `_id` (string ObjectId) instead of a numeric `id`.

### Population (relations between collections)
```ts
// album.schema.ts
@Prop({ type: [Types.ObjectId], ref: 'Song' })
songs: Song[];

// song.schema.ts
@Prop({ type: Types.ObjectId, ref: 'Album' })
album: Album;
```
Query with population:
```ts
findAllAlbumsWithSongs() {
  return this.albumModel.find().populate('songs');
}
```

---

## 28. Deployment to Railway

### Pre-deployment configuration
1. Make the env file path dynamic based on `NODE_ENV`:
   ```ts
   ConfigModule.forRoot({
     isGlobal: true,
     envFilePath: `${process.cwd()}/.env.${process.env.NODE_ENV}`,
     load: [configuration],
     validate,
   })
   ```
2. Set `NODE_ENV=development` / `NODE_ENV=production` via `package.json` scripts (or `cross-env`).
3. Add `.env.development` and `.env.production` to `.gitignore` — never push secrets.

### Steps
1. Push the project to a GitHub repository.
2. On Railway: **Deploy from GitHub repo**.
3. Add a **PostgreSQL** database via Railway's "+ New" → Database → Postgres.
4. Copy the Railway Postgres connection details (host, port, username, password, database) into your **production environment variables** in Railway's project settings (`DB_HOST`, `DB_PORT`, `DB_USERNAME`, `DB_PASSWORD`, `DB_NAME`, `SECRET`, `NODE_ENV=production`, `PORT`).
5. Generate a public domain for the deployed service.
6. **Run migrations against the production database**:
   - Ensure `dotenv/config` is required in `data-source.ts` so `process.env` values are populated for the CLI.
   - Use a custom `.env` for migration commands (Railway DB credentials).
   - Run:
     ```bash
     npm run migration:generate db/migrations/Init
     npm run migration:run
     ```
7. Test the deployed API via the generated domain + `/api` (Swagger) or REST client.
8. Disable/remove any seed-on-bootstrap logic before final production deploys (to avoid duplicating seed data on every restart).

---

## 29. Testing (Jest, Unit & E2E)

### Jest Basics
- `npm init -y`, install `jest` and `@types/jest` as dev dependencies.
- Add a `test` script and `--watchAll` for watch mode.
- Write `*.test.ts` / `*.spec.ts` files with `describe`, `it`/`test`, and `expect` matchers (`toBe`, `toEqual`, `toHaveBeenCalled`, `toHaveBeenCalledWith`, `toHaveBeenCalledTimes`, `resolves`, `rejects`, etc.)

### Mock Functions
```ts
const mockFn = jest.fn();
mockFn.mockReturnValue(4);
mockFn.mockImplementation((dto) => ({ ...dto, id: 1 }));
mockFn.mockResolvedValue([{ id: 1, title: 'Lover' }]); // for promises
```

### Spying
```ts
const spy = jest.spyOn(songRepository, 'create');
// or with custom implementation:
jest.spyOn(artistRepository, 'save').mockImplementation((dto) => ({ ...dto, id: 1 }));

afterEach(() => jest.restoreAllMocks());
```

### Unit Testing a Controller
Mock the service entirely using `useValue` in the testing module:
```ts
const module: TestingModule = await Test.createTestingModule({
  controllers: [SongController],
  providers: [
    {
      provide: SongService,
      useValue: {
        getSongs: jest.fn().mockResolvedValue([{ id: 1, title: 'Dancing Feet' }]),
        getSong: jest.fn().mockImplementation((id) => Promise.resolve({ id })),
        createSong: jest.fn().mockImplementation((dto) =>
          Promise.resolve({ ...dto, id: uuid() }),
        ),
        updateSong: jest.fn().mockResolvedValue({ affected: 1 }),
        deleteSong: jest.fn().mockResolvedValue({ affected: 1 }),
      },
    },
  ],
}).compile();
```

### Unit Testing a Service
Mock the repository using `getRepositoryToken`:
```ts
const module: TestingModule = await Test.createTestingModule({
  providers: [
    SongService,
    {
      provide: getRepositoryToken(Song),
      useValue: {
        find: jest.fn().mockResolvedValue([song1, song2]),
        findOneOrFail: jest.fn().mockResolvedValue(song1),
        create: jest.fn().mockResolvedValue(newSong),
        save: jest.fn(),
        update: jest.fn().mockResolvedValue({ affected: 1 }),
        delete: jest.fn().mockResolvedValue({ affected: 1 }),
      },
    },
  ],
}).compile();
```
Then spy on repository methods to assert they were called with the expected arguments.

### End-to-End (E2E) Testing
- Add `--watchAll --detectOpenHandles` to the `test:e2e` script.
- Use a **separate test database** (`synchronize: true` is okay here for ease of setup).
- Use `supertest` (`request(app.getHttpServer())`) to hit real endpoints.
- Lifecycle hooks:
  - `beforeAll` — create the testing module/app, register `TypeOrmModule.forRoot` with the test DB.
  - `afterEach` — clear repositories (`songRepository.clear()`) so tests don't interfere with each other.
  - `afterAll` — close the app.
- Example flow for `songs.e2e-spec.ts`:
  1. **GET /songs** — seed a song directly via repository, then assert the response array has length 1.
  2. **GET /songs/:id** — create a song, fetch by its ID, assert response body matches.
  3. **PUT /songs/:id** — create a song, send `UpdateSongDto`, assert `affected: 1`.
  4. **POST /songs** — send `CreateSongDto`, assert `201` and returned title.
  5. **DELETE /songs/:id** — create then delete, assert `affected: 1`.

---

## 30. NestJS Version 10 (SWC Compiler)

NestJS v10 integrates the **SWC (Speedy Web Compiler)**, written in Rust, for much faster builds and hot reload.

### Create a v10 project
```bash
nest new my-project
```
(Ensure your global `@nestjs/cli` is up to date.)

### Enable SWC
Install:
```bash
npm i -D @swc/cli @swc/core
```
In `nest-cli.json`:
```json
{
  "compilerOptions": {
    "builder": "swc",
    "typeCheck": true
  }
}
```
This dramatically reduces rebuild times during development.

---

## 31. WebSockets

For real-time, bidirectional features (chat, live scores, notifications), use WebSockets via Socket.IO.

### Packages
```bash
npm i @nestjs/websockets @nestjs/platform-socket.io
```

### Create the Events Gateway
```bash
nest g module events
nest g gateway events
```

```ts
@WebSocketGateway({ cors: { origin: '*' } })
export class EventsGateway implements OnModuleInit {
  @WebSocketServer()
  server: Server;

  onModuleInit() {
    this.server.on('connection', (socket) => {
      console.log(`Connected: ${socket.id}`);
    });
  }

  @SubscribeMessage('message')
  handleMessage(@MessageBody() data: any): Observable<WsResponse<any>> {
    console.log('Message received from client', data);
    return of({ event: 'message', data: 'Message returned from server: hello' });
  }
}
```

### Front-end (vanilla JS + Socket.IO client)
```html
<script src="https://cdn.socket.io/4.x/socket.io.min.js"></script>
<script>
  const socket = io('http://localhost:3000');
  socket.on('connect', () => console.log('connected', socket.id));
  socket.emit('message', 'I am the client');
  socket.on('message', (data) => console.log('event message received from server', data));
  socket.on('exception', (err) => console.error(err));
  socket.on('disconnect', () => console.log('disconnected'));
</script>
```

---

## 32. GraphQL

### Packages
```bash
npm i @nestjs/graphql @nestjs/apollo @apollo/server graphql
```

### Register `GraphQLModule` (schema-first approach)
```ts
GraphQLModule.forRoot<ApolloDriverConfig>({
  driver: ApolloDriver,
  typePaths: ['./**/*.graphql'],
  definitions: {
    path: join(process.cwd(), 'src/graphql.ts'),
    outputAs: 'class',
  },
})
```

### Define schema (`song.graphql`)
```graphql
type Song {
  id: ID!
  title: String
}

type Query {
  songs: [Song]
  song(id: ID!): Song
}

input CreateSongInput {
  title: String!
}

type UpdateResult {
  affected: Int
}

type DeleteResult {
  affected: Int
}

type Mutation {
  createSong(createSongInput: CreateSongInput!): Song
  updateSong(id: ID!, updateSongInput: UpdateSongInput!): UpdateResult
  deleteSong(id: ID!): DeleteResult
}

input UpdateSongInput {
  title: String
}
```

### Generate TypeScript typings
```bash
npx ts-node generate-typings.ts
# or add as a script:
"generate:typings": "ts-node generate-typings.ts"
```
`generate-typings.ts`:
```ts
const definitionsFactory = new GraphQLDefinitionsFactory();
definitionsFactory.generate({
  typePaths: ['./src/**/*.graphql'],
  path: join(process.cwd(), 'src/graphql.ts'),
  outputAs: 'class',
});
```

### Resolvers
```bash
nest g resolver songs
```
```ts
@Resolver()
export class SongResolver {
  constructor(private songService: SongService) {}

  @Query(() => [Song])
  async songs(): Promise<Song[]> {
    return this.songService.getSongs();
  }

  @Query(() => Song)
  async song(@Args('id') id: string): Promise<Song> {
    return this.songService.getSong(id);
  }

  @Mutation(() => Song)
  async createSong(@Args('createSongInput') input: CreateSongInput): Promise<Song> {
    return this.songService.createSong(input);
  }

  @Mutation(() => UpdateResult)
  async updateSong(
    @Args('id') id: string,
    @Args('updateSongInput') input: UpdateSongInput,
  ): Promise<UpdateResult> {
    return this.songService.updateSong(id, input);
  }

  @Mutation(() => DeleteResult)
  async deleteSong(@Args('id') id: string): Promise<DeleteResult> {
    return this.songService.deleteSong(id);
  }
}
```
Use the **GraphQL Playground** at `/graphql`.

### Error Handling
```ts
import { GraphQLError } from 'graphql';

throw new GraphQLError('Unable to fetch songs', {
  extensions: { code: 'INTERNAL_SERVER_ERROR' },
});
```

### Authentication in GraphQL
1. Define `User`, `SignUpInput`, `SignUpResponse`, `LoginInput`, `LoginResponse`, `Profile` types in `auth.graphql`.
2. `AuthResolver` with `@Mutation(() => SignUpResponse) signUp(...)` and `@Mutation(() => LoginResponse) login(...)`, delegating to `UserService`/`AuthService`.
3. Protecting a resolver field (`profile` query) requires a **GraphQL-aware guard**:
   ```ts
   @Injectable()
   export class GqlAuthGuard extends AuthGuard('jwt') {
     getRequest(context: ExecutionContext) {
       const ctx = GqlExecutionContext.create(context);
       return ctx.getContext().req;
     }
   }
   ```
4. Apply with `@UseGuards(GqlAuthGuard)` on the `profile` query resolver; access the user via `context.req.user` (mapped from `req` in the `GraphQLModule`'s `context` function).

### Subscriptions (real-time)
```bash
npm i graphql-subscriptions
```
Add `installSubscriptionHandlers: true` to `GraphQLModule.forRoot`.

`song.graphql`:
```graphql
type Subscription {
  songCreated: Song
}
```

Resolver:
```ts
const pubSub = new PubSub();

@Subscription(() => Song)
songCreated() {
  return pubSub.asyncIterator('songCreated');
}

@Mutation(() => Song)
async createSong(@Args('createSongInput') input: CreateSongInput) {
  const song = await this.songService.createSong(input);
  pubSub.publish('songCreated', { songCreated: song });
  return song;
}
```

### Caching (Apollo Server response cache)
```bash
npm i @apollo/server-plugin-response-cache
```
```ts
GraphQLModule.forRoot<ApolloDriverConfig>({
  driver: ApolloDriver,
  // ...
  plugins: [responseCachePlugin()],
  cache: 'bounded',
})
```
`cacheControl` directive in schema:
```graphql
directive @cacheControl(
  maxAge: Int
  scope: CacheControlScope
  inheritMaxAge: Boolean
) on FIELD_DEFINITION | OBJECT | INTERFACE | UNION

type Song {
  id: ID!
  title: String @cacheControl(maxAge: 30)
}
```

### DataLoader (avoid N+1 queries)
```bash
npm i dataloader
```
```ts
export const createUserLoader = (userService: UserService) =>
  new DataLoader<number, User>(async (ids) => {
    const users = await userService.findByIds(ids as number[]);
    const userMap = new Map(users.map((u) => [u.id, u]));
    return ids.map((id) => userMap.get(id));
  });
```
Provide it via `context` in `GraphQLModule.forRoot`, then in the `Post` resolver's `createdBy` field resolver, call `context.userLoader.load(post.userId)` instead of querying the DB directly — DataLoader **batches** all IDs requested during a single tick into one query.

### Code-First Approach (alternative)
Instead of `.graphql` SDL files, define types with decorators:
```ts
@ObjectType()
export class Post {
  @Field(() => Int)
  id: number;

  @Field()
  title: string;

  @Field()
  body: string;

  userId: number;

  @Field(() => User)
  createdBy: User;
}
```
Resolvers use `@ResolveField()` for relational fields. The `@nestjs/graphql` package can auto-generate the schema file from these decorators. There's also a community package (`nestjs-graphql-tools` style) for combining TypeORM + DataLoader + code-first.

### Apollo REST Data Source (consume external REST APIs)
```bash
npm i @apollo/datasource-rest
```
```ts
export class TodoAPI extends RESTDataSource {
  override baseURL = 'https://jsonplaceholder.typicode.com/';

  getTodos(): Promise<Todo[]> {
    return this.get('todos');
  }
}
```
Provide via `context`:
```ts
context: async () => ({
  dataSources: { todoAPI: new TodoAPI() },
})
```
Resolver:
```ts
@Query(() => [Todo])
async todos(@Context() context) {
  return context.dataSources.todoAPI.getTodos();
}
```

### Testing GraphQL
- **Unit tests**: mock the service the same way as REST resolvers/controllers; await resolver methods directly.
- **E2E tests**: send POST requests to the single `/graphql` endpoint with a `query`/`mutation` string and `variables` object using `supertest`; assert on `response.body.data.<fieldName>`.

---

## 33. Prisma ORM

**Prisma** is a "next-generation" ORM for Node.js/TypeScript — type-safe, auto-generates client APIs from your schema.

### Setup
```bash
npm i -D prisma
npx prisma init
```
This creates `prisma/schema.prisma` and a `.env` with `DATABASE_URL`. Set the provider to `postgresql` and update `DATABASE_URL` with your Postgres credentials.

### Define a model
```prisma
model Song {
  id    Int    @id @default(autoincrement())
  title String
}
```

### Run migrations
```bash
npx prisma migrate dev --name init
```
This creates the `prisma/migrations` folder and applies SQL to the database.

### Prisma Client
```bash
npm i @prisma/client
npx prisma generate
```

### `PrismaService`
```ts
@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }
}
```
Register `PrismaService` as a provider wherever it's needed.

### Generating CRUD resources
```bash
nest g resource songs
```
(Choose REST API; skip generating entities since Prisma models replace them.)

### CRUD with Prisma Client
```ts
create(data: Prisma.SongCreateInput) {
  return this.prisma.song.create({ data });
}

findAll() {
  return this.prisma.song.findMany();
}

findOne(id: number) {
  return this.prisma.song.findUnique({ where: { id } });
}

update(id: number, data: Prisma.SongUpdateInput) {
  return this.prisma.song.update({ where: { id }, data });
}

remove(id: number) {
  return this.prisma.song.delete({ where: { id } });
}
```
Types like `Prisma.SongCreateInput`, `Prisma.SongWhereUniqueInput`, `Prisma.SongUpdateInput` are auto-generated.

### Relations in Prisma

**One-to-Many (Artist → Songs)**
```prisma
model Artist {
  id    Int    @id @default(autoincrement())
  name  String
  songs Song[]
}

model Song {
  id       Int     @id @default(autoincrement())
  title    String
  artistId Int?
  artist   Artist? @relation(fields: [artistId], references: [id])
}
```
Run `npx prisma migrate dev --name add_artist`.

Insert with nested artist ID:
```ts
this.prisma.song.create({
  data: { title: 'Animals', artistId: 1 },
});
```
Include relation in query:
```ts
this.prisma.song.findMany({ include: { artist: true } });
```

**One-to-One (User ↔ Profile)**
```prisma
model User {
  id      Int      @id @default(autoincrement())
  name    String
  profile Profile?
}

model Profile {
  id          Int    @id @default(autoincrement())
  photo       String
  phoneNumber String
  userId      Int    @unique
  user        User   @relation(fields: [userId], references: [id])
}
```
Nested create:
```ts
this.prisma.user.create({
  data: {
    name: 'Jen Doe',
    profile: {
      create: { photo: '...', phoneNumber: '...' },
    },
  },
});
```

**Many-to-Many (Posts ↔ Categories, with explicit join model)**
```prisma
model Post {
  id         Int                @id @default(autoincrement())
  title      String
  categories CategoriesOnPosts[]
}

model Category {
  id    Int                @id @default(autoincrement())
  name  String
  posts CategoriesOnPosts[]
}

model CategoriesOnPosts {
  post       Post     @relation(fields: [postId], references: [id])
  postId     Int
  category   Category @relation(fields: [categoryId], references: [id])
  categoryId Int
  assignedAt DateTime @default(now())
  assignedBy String

  @@id([postId, categoryId])
}
```
Create a post with new categories:
```ts
this.prisma.post.create({
  data: {
    title: 'One-to-many relation',
    categories: {
      create: [
        { category: { create: { name: 'NestJS' } }, assignedBy: 'admin' },
        { category: { create: { name: 'Prisma' } }, assignedBy: 'admin' },
      ],
    },
  },
});
```
Or connect to existing categories using `connect: { id }`.

Relational queries:
```ts
this.prisma.post.findMany({
  where: { categories: { some: { category: { name: 'NestJS' } } } },
  include: { categories: { include: { category: true } } },
});
```

### Transactions

**Sequential (`$transaction([...])`)** — runs multiple independent queries; if any fails, none are committed:
```ts
const [posts, artists, songs, applications] = await this.prisma.$transaction([
  this.prisma.post.findMany(),
  this.prisma.artist.findMany(),
  this.prisma.song.findMany(),
  this.prisma.application.findMany(),
]);
```

**Nested writes** — Prisma automatically wraps nested `create` operations (e.g., creating a `Customer` with nested `Address` and `Application[]`) in a transaction. If any nested write fails, the entire operation rolls back.

**Interactive transactions (`$transaction(async (tx) => {...})`)** — for when one query depends on the result of another:
```ts
async transfer(senderId: number, receiverId: number, amount: number) {
  return this.prisma.$transaction(async (tx) => {
    const sender = await tx.account.update({
      where: { id: senderId },
      data: { balance: { decrement: amount } },
    });

    if (sender.balance < 0) {
      throw new Error(`Account ${senderId} does not have enough balance`);
    }

    const receiver = await tx.account.update({
      where: { id: receiverId },
      data: { balance: { increment: amount } },
    });

    return receiver;
  });
}
```
If the balance check fails, Prisma automatically rolls back the deduction.

---

## 34. File Upload

### Packages
```bash
npm i -D @types/multer
```
(`@nestjs/platform-express` ships Multer integration.)

### Basic upload endpoint
```ts
@UseInterceptors(FileInterceptor('file'))
@Post('upload')
uploadFile(@UploadedFile() file: Express.Multer.File) {
  console.log(file);
  return { message: 'File uploaded successfully' };
}
```

### Save to disk with `diskStorage`
```ts
@UseInterceptors(
  FileInterceptor('file', {
    storage: diskStorage({
      destination: './upload/files',
      filename: (req, file, cb) => {
        cb(null, file.originalname);
      },
    }),
  }),
)
```

### File type validation
```ts
@UploadedFile(
  new ParseFilePipeBuilder()
    .addFileTypeValidator({ fileType: 'png' })
    .build({ errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY }),
)
file: Express.Multer.File
```

---

## 35. Custom Decorators

Custom decorators add metadata/functionality to classes, methods, or parameters — improving modularity, reusability, and code organization.

### Custom parameter decorator
```ts
// user.decorator.ts
export const User = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    request.user = { id: '123', name: 'demo' }; // example: derived from JWT
    return request.user;
  },
);
```

### Usage
```ts
@Get('user')
findUser(@User() user: UserEntity) {
  return user;
}
```
Calling this endpoint executes the decorator's factory function, attaches a `user` object to the request, and returns it.

---

## 36. Cron Jobs / Task Scheduling

### Packages
```bash
npm i @nestjs/schedule
npm i -D @types/cron
```

### Register module
```ts
ScheduleModule.forRoot()
```

### Task service
```ts
@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name);

  @Cron('*/5 * * * * *') // every 5 seconds
  handleCron() {
    this.logger.debug('Called when the current second is 5');
  }
}
```
Cron expression format: `second minute hour day-of-month month day-of-week`. Use cases include checking trial expirations, sending reminder notifications, periodic cleanup, etc.

---

## 37. Cookies

### Packages
```bash
npm i cookie-parser
npm i -D @types/cookie-parser
```

### Register middleware (`main.ts`)
```ts
app.use(cookieParser());
```

### Set & read cookies
```ts
@Get('set-cookie')
setCookie(@Res({ passthrough: true }) res: Response) {
  res.cookie('token', 'encrypted-value', { httpOnly: true });
  return { message: 'Cookie saved successfully' };
}

@Get('get-cookies')
getCookies(@Req() req: Request) {
  return req.cookies;
}
```

### Use cases
- Session management & expiry
- Shopping cart persistence
- Authentication tokens (JWT stored in cookies instead of/alongside local storage)
- Tracking, analytics, personalization, caching, load balancing

---

## 38. Queues (Bull + Redis)

For offloading CPU-intensive or long-running tasks (e.g., audio/video conversion, sending emails, generating reports) to background workers.

### Packages
```bash
npm i @nestjs/bull bull
```

### Run Redis via Docker
```yaml
# docker-compose.yml
version: '3'
services:
  redis:
    image: redis
    ports:
      - 6379:6379
```
```bash
docker compose up
```

### Register Bull
```ts
// app.module.ts
BullModule.forRoot({
  redis: { host: 'localhost', port: 6379 },
})

// audio.module.ts
BullModule.registerQueue({ name: 'audio-queue' })
```

### Producer (controller)
```ts
constructor(@InjectQueue('audio-queue') private audioQueue: Queue) {}

@Post('convert')
async convert() {
  await this.audioQueue.add('convert', { file: 'sample.wav', id: 1 });
  return { message: 'Conversion job queued' };
}
```

### Consumer (processor)
```ts
@Processor('audio-queue')
export class AudioProcessor {
  @Process('convert')
  handleConvert(job: Job) {
    console.log('Starting wav -> mp3 conversion', job.data);
    // ...conversion logic...
    console.log('Converted successfully');
  }
}
```
Register `AudioProcessor` as a provider in `AudioModule`. Inspect queue jobs in Redis (e.g., via a Redis GUI extension).

---

## 39. Event Emitter

A publish/subscribe mechanism for decoupled inter-module communication.

### Package
```bash
npm i @nestjs/event-emitter
```

### Register
```ts
EventEmitterModule.forRoot()
```

### Define an event type
```ts
export class AudioConvertedEvent {
  file: string;
  id: number;
}
```

### Emit an event
```ts
constructor(private eventEmitter: EventEmitter2) {}

handleConvert(job: Job) {
  // ...conversion...
  this.eventEmitter.emit('audio.converted', { file: job.data.file, id: job.data.id });
}
```

### Listen for an event
```ts
@Injectable()
export class AudioConvertedListener {
  @OnEvent('audio.converted')
  handleAudioConvertedEvent(payload: AudioConvertedEvent) {
    console.log('Notification sent to user: file converted successfully', payload);
    // send email/push notification, etc.
  }
}
```
Register `AudioConvertedListener` as a provider.

### Use cases
Module communication, notifications, real-time updates, logging/monitoring, error reporting, auth event hooks (e.g., "user logged in"), cache invalidation.

---

## 40. Streaming Files

Streaming sends/receives data in chunks rather than all at once — efficient for large files, media, logs, etc.

### Download a file as a stream
```ts
@Get('stream-file')
getFile(): StreamableFile {
  const file = createReadStream(join(process.cwd(), 'package.json'));
  return new StreamableFile(file);
}
```

### Set proper content type / filename for download
```ts
@Get('stream-file-customize')
getFileCustomized(@Res({ passthrough: true }) res: Response): StreamableFile {
  const file = createReadStream(join(process.cwd(), 'package.json'));
  res.set({
    'Content-Type': 'application/json',
    'Content-Disposition': 'attachment; filename="package.json"',
  });
  return new StreamableFile(file);
}
```
Other use cases: media streaming (e.g., Netflix-like apps), real-time communication, large log/XML/JSON parsing, server-sent events, proxy servers.

---

## 41. Sessions

Sessions maintain stateful data across requests from the same client (typically via cookies holding a session ID).

### Packages
```bash
npm i express-session
npm i -D @types/express-session
```

### Register middleware (`main.ts`)
```ts
app.use(
  session({
    secret: 'my-secret',
    resave: false,
    saveUninitialized: false,
  }),
);
```

### Login: store user in session
```ts
@Post('login')
login(@Req() req: Request) {
  req.session['user'] = { id: '...', username: '...' };
  return { message: 'User logged in' };
}
```

### Profile: read from session
```ts
@Get('profile')
profile(@Req() req: Request) {
  if (req.session['user']) {
    return req.session['user'];
  }
  return { message: 'Not logged in' };
}
```

### Use cases
Session-based authentication/authorization, user preferences, shopping carts, user tracking, caching, personalization, form-data persistence.

---

## Summary of Key Packages Used Throughout the Course

| Area | Packages |
|---|---|
| Core | `@nestjs/core`, `@nestjs/common`, `@nestjs/platform-express` |
| Validation | `class-validator`, `class-transformer` |
| TypeORM / Postgres | `@nestjs/typeorm`, `typeorm`, `pg` |
| Pagination | `nestjs-typeorm-paginate` |
| Auth | `bcryptjs`, `@nestjs/jwt`, `@nestjs/passport`, `passport`, `passport-jwt`, `passport-http-bearer`, `speakeasy`, `uuid` |
| Config | `@nestjs/config` |
| Hot Reload | `webpack`, `webpack-node-externals`, `run-script-webpack-plugin` |
| Docs | `@nestjs/swagger` |
| MongoDB | `@nestjs/mongoose`, `mongoose` |
| Testing | `jest`, `@nestjs/testing`, `supertest` |
| GraphQL | `@nestjs/graphql`, `@nestjs/apollo`, `@apollo/server`, `graphql`, `graphql-subscriptions`, `dataloader`, `@apollo/datasource-rest`, `@apollo/server-plugin-response-cache` |
| Prisma | `prisma`, `@prisma/client` |
| File Upload | `@types/multer` |
| Scheduling | `@nestjs/schedule` |
| Cookies | `cookie-parser` |
| Queues | `@nestjs/bull`, `bull` (with Redis via Docker) |
| Events | `@nestjs/event-emitter` |
| Sessions | `express-session` |

---

## Final Notes

- Always use **migrations** (`synchronize: false`) in production.
- Never commit `.env` files — store secrets as environment variables in your hosting provider.
- Use **DTOs + ValidationPipe** for all incoming data.
- Protect sensitive routes with **Guards** (JWT, role-based, API key).
- Write **unit tests** (mocked dependencies) for individual functions and **e2e tests** (real test DB) for full request/response flows.
- For performance: use **Singleton scope** by default, **caching** for expensive/frequent GraphQL fields, and **DataLoader** to avoid N+1 queries.
- Offload heavy/long-running work to **queues** and decouple side effects with the **event emitter**.