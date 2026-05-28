# 🟢 Node.js — Complete Guide with TypeScript

> A comprehensive reference covering Node.js concepts, architecture, core modules, and real-world TypeScript examples.

---

## 📌 Table of Contents

1. [What is Node.js?](#1-what-is-nodejs)
2. [How Node.js Works](#2-how-nodejs-works)
3. [Installing Node.js & TypeScript Setup](#3-installing-nodejs--typescript-setup)
4. [Core Concepts](#4-core-concepts)
  - Event Loop
  - Non-Blocking I/O
  - Callback, Promise, Async/Await
5. [Core Modules](#5-core-modules)
  - `fs` — File System
  - `path` — Path Utilities
  - `os` — Operating System
  - `http` — HTTP Server
  - `events` — EventEmitter
  - `stream` — Streams
  - `crypto` — Cryptography
  - `child_process` — Child Processes
  - `url` — URL Parsing
  - `buffer` — Buffer
6. [npm & package.json](#6-npm--packagejson)
7. [Modules System (CommonJS vs ESM)](#7-modules-system-commonjs-vs-esm)
8. [Error Handling](#8-error-handling)
9. [Express.js — Web Framework](#9-expressjs--web-framework)
10. [Working with Databases](#10-working-with-databases)
11. [Environment Variables](#11-environment-variables)
12. [TypeScript Configuration](#12-typescript-configuration)
13. [Best Practices](#13-best-practices)
14. [Node.js Architecture Diagram](#14-nodejs-architecture-diagram)

---

## 1. What is Node.js?

**Node.js** is an open-source, cross-platform **JavaScript runtime environment** built on Google Chrome's **V8 JavaScript engine**. It allows you to run JavaScript code **outside of a web browser** — on the server side.

### Key Characteristics


| Feature             | Description                                   |
| ------------------- | --------------------------------------------- |
| **Runtime**         | Executes JavaScript on the server using V8    |
| **Asynchronous**    | Non-blocking I/O operations by default        |
| **Single-Threaded** | Uses one main thread with an event loop       |
| **Event-Driven**    | Reacts to events (requests, file reads, etc.) |
| **NPM Ecosystem**   | Access to 2M+ packages via npm                |
| **Cross-Platform**  | Runs on Windows, macOS, Linux                 |


### When to Use Node.js

- ✅ REST APIs and microservices
- ✅ Real-time applications (chat, live notifications)
- ✅ Streaming data applications
- ✅ CLI tools
- ✅ Server-Side Rendering (SSR)
- ❌ CPU-intensive tasks (image processing, ML inference)

---

## 2. How Node.js Works

### The Event Loop

Node.js uses a **single-threaded event loop** to handle concurrent operations without creating multiple threads.

```
   ┌─────────────────────────────┐
   │         Your Code           │
   └──────────────┬──────────────┘
                  │
   ┌──────────────▼──────────────┐
   │          Event Loop         │
   │  ┌────────┐  ┌───────────┐  │
   │  │ timers │→ │  I/O cb   │  │
   │  └────────┘  └───────────┘  │
   │  ┌──────────────────────┐   │
   │  │  check (setImmediate) │  │
   │  └──────────────────────┘   │
   └──────────────┬──────────────┘
                  │
   ┌──────────────▼──────────────┐
   │        libuv Thread Pool    │
   │   (fs, crypto, dns, etc.)   │
   └─────────────────────────────┘
```

**Phases of the Event Loop:**

1. **Timers** — executes `setTimeout` and `setInterval` callbacks
2. **Pending Callbacks** — executes I/O callbacks deferred to next loop
3. **Idle/Prepare** — internal use only
4. **Poll** — fetches new I/O events; executes I/O callbacks
5. **Check** — executes `setImmediate` callbacks
6. **Close Callbacks** — executes close events (e.g., `socket.on('close')`)

---

## 3. Installing Node.js & TypeScript Setup

### Install Node.js

```bash
# Using nvm (recommended)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.5/install.sh | bash
nvm install --lts
nvm use --lts

# Verify installation
node --version    # v20.x.x
npm --version     # 10.x.x
```

### Initialize a TypeScript Node.js Project

```bash
# Create project folder
mkdir my-node-app && cd my-node-app

# Initialize npm
npm init -y

# Install TypeScript and Node type definitions
npm install --save-dev typescript ts-node @types/node nodemon

# Initialize TypeScript config
npx tsc --init
```

### Project Structure

```
my-node-app/
├── src/
│   ├── index.ts
│   ├── routes/
│   ├── services/
│   └── utils/
├── dist/              ← compiled JS output
├── tsconfig.json
├── package.json
└── .env
```

---

## 4. Core Concepts

### 4.1 Callbacks

A **callback** is a function passed as an argument to another function, executed after an async operation completes.

```typescript
import fs from "fs";

// Callback style
fs.readFile("./data.txt", "utf-8", (err: NodeJS.ErrnoException | null, data: string) => {
  if (err) {
    console.error("Error reading file:", err.message);
    return;
  }
  console.log("File content:", data);
});

console.log("This runs BEFORE file is read (non-blocking)");
```

**Problem with callbacks:** "Callback Hell" — deeply nested code that is hard to read.

```typescript
// Callback Hell Example (avoid this)
fs.readFile("file1.txt", "utf-8", (err, data1) => {
  fs.readFile("file2.txt", "utf-8", (err, data2) => {
    fs.readFile("file3.txt", "utf-8", (err, data3) => {
      console.log(data1, data2, data3); // deeply nested ❌
    });
  });
});
```

---

### 4.2 Promises

A **Promise** represents a value that may be available now, in the future, or never.

```typescript
import { promises as fsPromises } from "fs";

function readFileAsync(filePath: string): Promise<string> {
  return fsPromises.readFile(filePath, "utf-8");
}

// Using .then() / .catch()
readFileAsync("./data.txt")
  .then((data: string) => console.log("Content:", data))
  .catch((err: Error) => console.error("Error:", err.message))
  .finally(() => console.log("Done"));

// Chaining promises
readFileAsync("./a.txt")
  .then((data) => {
    const processed = data.toUpperCase();
    return fsPromises.writeFile("./b.txt", processed);
  })
  .then(() => console.log("File written successfully"))
  .catch(console.error);
```

---

### 4.3 Async / Await

**Async/Await** is syntactic sugar over Promises, making asynchronous code look synchronous.

```typescript
import { promises as fsPromises } from "fs";

async function processFiles(): Promise<void> {
  try {
    // Sequential reads
    const file1 = await fsPromises.readFile("./file1.txt", "utf-8");
    const file2 = await fsPromises.readFile("./file2.txt", "utf-8");

    const combined = `${file1}\n${file2}`;
    await fsPromises.writeFile("./output.txt", combined);
    console.log("Files combined successfully");
  } catch (error) {
    if (error instanceof Error) {
      console.error("Failed:", error.message);
    }
  }
}

// Parallel reads using Promise.all
async function readInParallel(): Promise<void> {
  const [file1, file2, file3] = await Promise.all([
    fsPromises.readFile("./f1.txt", "utf-8"),
    fsPromises.readFile("./f2.txt", "utf-8"),
    fsPromises.readFile("./f3.txt", "utf-8"),
  ]);
  console.log(file1, file2, file3);
}

processFiles();
```

---

## 5. Core Modules

### 5.1 `fs` — File System

Provides an API for interacting with the file system.

```typescript
import fs from "fs";
import { promises as fsp } from "fs";
import path from "path";

// ─── Synchronous (blocking) ───────────────────────────
const content: string = fs.readFileSync("./hello.txt", "utf-8");
console.log(content);

// ─── Asynchronous (non-blocking) ─────────────────────
async function fileOperations(): Promise<void> {
  const filePath = path.join(__dirname, "example.txt");

  // Write a file
  await fsp.writeFile(filePath, "Hello, Node.js with TypeScript!");

  // Append to a file
  await fsp.appendFile(filePath, "\nAppended line.");

  // Read a file
  const data = await fsp.readFile(filePath, "utf-8");
  console.log("Read:", data);

  // Get file stats
  const stats = await fsp.stat(filePath);
  console.log("Size:", stats.size, "bytes");
  console.log("Is file:", stats.isFile());

  // Rename file
  await fsp.rename(filePath, path.join(__dirname, "renamed.txt"));

  // Delete file
  await fsp.unlink(path.join(__dirname, "renamed.txt"));

  // Create directory
  await fsp.mkdir(path.join(__dirname, "new-folder"), { recursive: true });

  // List directory contents
  const files = await fsp.readdir(__dirname);
  console.log("Files:", files);
}

fileOperations();
```

---

### 5.2 `path` — Path Utilities

Utilities for working with file and directory paths.

```typescript
import path from "path";

// Join path segments
const fullPath = path.join("/users", "john", "documents", "file.txt");
console.log(fullPath); // /users/john/documents/file.txt

// Resolve to absolute path
const absPath = path.resolve("src", "index.ts");
console.log(absPath); // /current/working/dir/src/index.ts

// Get directory name
console.log(path.dirname("/users/john/file.txt")); // /users/john

// Get file name
console.log(path.basename("/users/john/file.txt")); // file.txt
console.log(path.basename("/users/john/file.txt", ".txt")); // file

// Get extension
console.log(path.extname("index.html")); // .html

// Parse path into components
const parsed = path.parse("/users/john/file.txt");
console.log(parsed);
// { root: '/', dir: '/users/john', base: 'file.txt', ext: '.txt', name: 'file' }

// Platform separator
console.log(path.sep); // '/' on Unix, '\' on Windows

// __dirname equivalent in ESM
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
```

---

### 5.3 `os` — Operating System

Provides operating system-related utility methods and properties.

```typescript
import os from "os";

console.log("Platform:    ", os.platform());     // linux / darwin / win32
console.log("Architecture:", os.arch());          // x64 / arm64
console.log("Hostname:    ", os.hostname());      // machine-name
console.log("Home Dir:    ", os.homedir());       // /home/user
console.log("Temp Dir:    ", os.tmpdir());        // /tmp
console.log("CPU Cores:   ", os.cpus().length);  // 8
console.log("Total Mem:   ", (os.totalmem() / 1024 ** 3).toFixed(2), "GB");
console.log("Free Mem:    ", (os.freemem()  / 1024 ** 3).toFixed(2), "GB");
console.log("Uptime:      ", (os.uptime()   / 3600).toFixed(2), "hours");

// CPU details
const cpus = os.cpus();
cpus.forEach((cpu, i) => {
  console.log(`CPU ${i}: ${cpu.model} @ ${cpu.speed} MHz`);
});

// Network interfaces
const nets = os.networkInterfaces();
for (const [name, addrs] of Object.entries(nets)) {
  addrs?.forEach((addr) => {
    if (addr.family === "IPv4") {
      console.log(`${name}: ${addr.address}`);
    }
  });
}
```

---

### 5.4 `http` — HTTP Server

Built-in module to create HTTP servers and make HTTP requests.

```typescript
import http, { IncomingMessage, ServerResponse } from "http";

interface RouteHandler {
  [key: string]: (req: IncomingMessage, res: ServerResponse) => void;
}

const routes: RouteHandler = {
  "GET /": (req, res) => {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Welcome to Node.js API!" }));
  },
  "GET /health": (req, res) => {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ status: "ok", uptime: process.uptime() }));
  },
};

const server = http.createServer((req: IncomingMessage, res: ServerResponse) => {
  const key = `${req.method} ${req.url}`;
  const handler = routes[key];

  if (handler) {
    handler(req, res);
  } else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "Not Found" }));
  }
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
```

---

### 5.5 `events` — EventEmitter

Node.js is event-driven. The `EventEmitter` class is the backbone of async event handling.

```typescript
import { EventEmitter } from "events";

// Define typed events using an interface
interface AppEvents {
  data: (payload: { id: number; value: string }) => void;
  error: (err: Error) => void;
  done: () => void;
}

class DataProcessor extends EventEmitter {
  process(items: string[]): void {
    items.forEach((item, index) => {
      if (!item) {
        this.emit("error", new Error(`Empty item at index ${index}`));
        return;
      }
      this.emit("data", { id: index, value: item.toUpperCase() });
    });
    this.emit("done");
  }
}

const processor = new DataProcessor();

// Register event listeners
processor.on("data", ({ id, value }) => {
  console.log(`Processed [${id}]: ${value}`);
});

processor.on("error", (err: Error) => {
  console.error("Error:", err.message);
});

processor.once("done", () => {     // 'once' fires only one time
  console.log("All items processed!");
});

processor.process(["hello", "world", "", "node"]);

// Remove a listener
const handler = () => console.log("triggered");
processor.on("done", handler);
processor.off("done", handler);     // same as removeListener
```

---

### 5.6 `stream` — Streams

Streams handle data in chunks rather than loading everything into memory.

```typescript
import fs from "fs";
import { Transform, TransformCallback } from "stream";
import { pipeline } from "stream/promises";

// ─── Readable Stream ──────────────────────────────────
const readable = fs.createReadStream("./large-file.txt", {
  encoding: "utf-8",
  highWaterMark: 64 * 1024, // 64 KB chunks
});

readable.on("data", (chunk: string) => process.stdout.write(chunk));
readable.on("end", () => console.log("\nDone reading"));
readable.on("error", (err) => console.error(err));

// ─── Writable Stream ─────────────────────────────────
const writable = fs.createWriteStream("./output.txt");
writable.write("Line 1\n");
writable.write("Line 2\n");
writable.end();

// ─── Transform Stream ────────────────────────────────
class UpperCaseTransform extends Transform {
  _transform(chunk: Buffer, _encoding: string, callback: TransformCallback): void {
    this.push(chunk.toString().toUpperCase());
    callback();
  }
}

// ─── Pipeline (safe pipe with error handling) ─────────
async function transformFile(): Promise<void> {
  await pipeline(
    fs.createReadStream("./input.txt"),
    new UpperCaseTransform(),
    fs.createWriteStream("./output.txt")
  );
  console.log("Pipeline succeeded");
}

transformFile().catch(console.error);
```

---

### 5.7 `crypto` — Cryptography

Built-in cryptographic functions.

```typescript
import crypto from "crypto";

// ─── Hashing ──────────────────────────────────────────
function hashData(data: string, algorithm = "sha256"): string {
  return crypto.createHash(algorithm).update(data).digest("hex");
}

console.log(hashData("Hello World"));

// ─── HMAC (Hash-based Message Authentication Code) ───
function createHmac(data: string, secret: string): string {
  return crypto.createHmac("sha256", secret).update(data).digest("hex");
}

const signature = createHmac("payload data", "my-secret-key");
console.log("HMAC:", signature);

// ─── Random Values ────────────────────────────────────
const token = crypto.randomBytes(32).toString("hex");     // secure token
const uuid  = crypto.randomUUID();                        // UUID v4
console.log("Token:", token);
console.log("UUID:", uuid);

// ─── AES-256 Encryption / Decryption ─────────────────
const ALGORITHM = "aes-256-cbc";
const KEY       = crypto.randomBytes(32);
const IV        = crypto.randomBytes(16);

function encrypt(text: string): string {
  const cipher = crypto.createCipheriv(ALGORITHM, KEY, IV);
  return Buffer.concat([cipher.update(text, "utf-8"), cipher.final()]).toString("hex");
}

function decrypt(encrypted: string): string {
  const decipher = crypto.createDecipheriv(ALGORITHM, KEY, IV);
  return Buffer.concat([
    decipher.update(Buffer.from(encrypted, "hex")),
    decipher.final(),
  ]).toString("utf-8");
}

const encrypted = encrypt("Secret message");
console.log("Encrypted:", encrypted);
console.log("Decrypted:", decrypt(encrypted));

// ─── Password Hashing with scrypt ────────────────────
async function hashPassword(password: string): Promise<string> {
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = await new Promise<string>((resolve, reject) => {
    crypto.scrypt(password, salt, 64, (err, derived) => {
      if (err) reject(err);
      else resolve(`${salt}:${derived.toString("hex")}`);
    });
  });
  return hash;
}
```

---

### 5.8 `child_process` — Child Processes

Run shell commands or spawn sub-processes.

```typescript
import { exec, spawn, execSync } from "child_process";
import { promisify } from "util";

const execAsync = promisify(exec);

// ─── exec (buffered output) ───────────────────────────
async function listFiles(): Promise<void> {
  const { stdout, stderr } = await execAsync("ls -la");
  if (stderr) console.error(stderr);
  console.log(stdout);
}

// ─── execSync (blocking) ─────────────────────────────
const output = execSync("node --version").toString().trim();
console.log("Node version:", output);

// ─── spawn (streaming output) ─────────────────────────
function runScript(scriptPath: string): void {
  const child = spawn("node", [scriptPath], { stdio: "inherit" });

  child.on("close", (code: number | null) => {
    console.log(`Script exited with code: ${code}`);
  });

  child.on("error", (err: Error) => {
    console.error("Failed to start:", err.message);
  });
}
```

---

### 5.9 `url` — URL Parsing

Parse and construct URLs.

```typescript
import { URL, URLSearchParams } from "url";

const myUrl = new URL("https://api.example.com:8080/users?page=2&limit=10#results");

console.log("Protocol:  ", myUrl.protocol);   // https:
console.log("Host:      ", myUrl.host);        // api.example.com:8080
console.log("Hostname:  ", myUrl.hostname);    // api.example.com
console.log("Port:      ", myUrl.port);        // 8080
console.log("Pathname:  ", myUrl.pathname);    // /users
console.log("Search:    ", myUrl.search);      // ?page=2&limit=10
console.log("Hash:      ", myUrl.hash);        // #results

// Query parameters
const params = myUrl.searchParams;
console.log("page: ",  params.get("page"));    // 2
console.log("limit:", params.get("limit"));    // 10

// Modify URL
params.set("page", "3");
params.append("sort", "asc");
console.log("Updated URL:", myUrl.toString());

// URLSearchParams standalone
const qs = new URLSearchParams({ name: "John", age: "30" });
console.log(qs.toString()); // name=John&age=30
```

---

### 5.10 `buffer` — Buffer

Handle binary data directly in memory.

```typescript
// ─── Create Buffers ───────────────────────────────────
const buf1 = Buffer.alloc(10);                        // 10 bytes, zero-filled
const buf2 = Buffer.from("Hello, Node.js", "utf-8"); // from string
const buf3 = Buffer.from([0x48, 0x65, 0x6c, 0x6c, 0x6f]); // from array

// ─── Convert Buffer ───────────────────────────────────
console.log(buf2.toString("utf-8"));   // Hello, Node.js
console.log(buf2.toString("base64"));  // base64 encoded
console.log(buf2.toString("hex"));     // hex encoded
console.log(buf2.length);              // byte length

// ─── Copy / Slice ─────────────────────────────────────
const src = Buffer.from("Hello World");
const dst = Buffer.alloc(5);
src.copy(dst, 0, 0, 5);
console.log(dst.toString()); // Hello

const slice = src.subarray(6, 11);
console.log(slice.toString()); // World

// ─── Concatenate ─────────────────────────────────────
const combined = Buffer.concat([
  Buffer.from("Hello "),
  Buffer.from("World"),
]);
console.log(combined.toString()); // Hello World
```

---

## 6. npm & package.json

### Understanding `package.json`

```json
{
  "name": "my-node-app",
  "version": "1.0.0",
  "description": "A Node.js TypeScript application",
  "main": "dist/index.js",
  "scripts": {
    "build":   "tsc",
    "start":   "node dist/index.js",
    "dev":     "nodemon --exec ts-node src/index.ts",
    "lint":    "eslint src/**/*.ts",
    "test":    "jest"
  },
  "dependencies": {
    "express": "^4.18.2",
    "dotenv":  "^16.0.3"
  },
  "devDependencies": {
    "@types/node":    "^20.0.0",
    "@types/express": "^4.17.21",
    "typescript":     "^5.0.0",
    "ts-node":        "^10.9.0",
    "nodemon":        "^3.0.0"
  }
}
```

### Common npm Commands

```bash
npm init -y                    # Initialize package.json
npm install express            # Install a package
npm install -D typescript      # Install dev dependency
npm uninstall express          # Remove a package
npm update                     # Update all packages
npm list                       # List installed packages
npm run dev                    # Run a script
npm audit                      # Check for vulnerabilities
npm audit fix                  # Auto-fix vulnerabilities
npx ts-node src/index.ts       # Run TypeScript directly
```

---

## 7. Modules System (CommonJS vs ESM)

### CommonJS (default in Node.js)

```typescript
// math.ts — exporting
export function add(a: number, b: number): number {
  return a + b;
}

export const PI = 3.14159;

export default class Calculator {
  multiply(a: number, b: number): number {
    return a * b;
  }
}

// index.ts — importing
import Calculator, { add, PI } from "./math";

console.log(add(2, 3));       // 5
console.log(PI);              // 3.14159
const calc = new Calculator();
console.log(calc.multiply(4, 5)); // 20
```

### Re-exporting from an index file (barrel pattern)

```typescript
// src/utils/index.ts
export { add, PI } from "./math";
export { formatDate } from "./date";
export { validateEmail } from "./validation";

// Usage — clean imports
import { add, formatDate, validateEmail } from "./utils";
```

---

## 8. Error Handling

### Custom Error Classes

```typescript
// Custom error types
class AppError extends Error {
  constructor(
    message: string,
    public readonly statusCode: number,
    public readonly code: string
  ) {
    super(message);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

class NotFoundError extends AppError {
  constructor(resource: string) {
    super(`${resource} not found`, 404, "NOT_FOUND");
  }
}

class ValidationError extends AppError {
  constructor(field: string, message: string) {
    super(`Validation failed on '${field}': ${message}`, 400, "VALIDATION_ERROR");
  }
}

// Using custom errors
async function getUser(id: number): Promise<{ id: number; name: string }> {
  if (id <= 0) throw new ValidationError("id", "must be a positive integer");

  const user = null; // simulate DB miss
  if (!user) throw new NotFoundError(`User #${id}`);

  return { id, name: "Alice" };
}

// Global error handler
process.on("uncaughtException", (err: Error) => {
  console.error("Uncaught Exception:", err);
  process.exit(1);
});

process.on("unhandledRejection", (reason: unknown) => {
  console.error("Unhandled Rejection:", reason);
  process.exit(1);
});
```

---

## 9. Express.js — Web Framework

Install: `npm install express` and `npm install -D @types/express`

```typescript
import express, { Request, Response, NextFunction, Application } from "express";
import { json } from "express";

// ─── Types ────────────────────────────────────────────
interface User {
  id: number;
  name: string;
  email: string;
}

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

// ─── App Setup ───────────────────────────────────────
const app: Application = express();
app.use(json());

// In-memory store (use a DB in production)
const users: User[] = [
  { id: 1, name: "Alice", email: "alice@example.com" },
  { id: 2, name: "Bob",   email: "bob@example.com"   },
];

// ─── Middleware ───────────────────────────────────────
app.use((req: Request, _res: Response, next: NextFunction) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
});

// ─── Routes ───────────────────────────────────────────
// GET all users
app.get("/users", (_req: Request, res: Response<ApiResponse<User[]>>) => {
  res.json({ success: true, data: users });
});

// GET user by ID
app.get("/users/:id", (req: Request<{ id: string }>, res: Response) => {
  const user = users.find((u) => u.id === Number(req.params.id));
  if (!user) return res.status(404).json({ success: false, error: "User not found" });
  res.json({ success: true, data: user });
});

// POST create user
app.post("/users", (req: Request<{}, {}, Omit<User, "id">>, res: Response) => {
  const newUser: User = { id: users.length + 1, ...req.body };
  users.push(newUser);
  res.status(201).json({ success: true, data: newUser });
});

// PUT update user
app.put("/users/:id", (req: Request<{ id: string }>, res: Response) => {
  const index = users.findIndex((u) => u.id === Number(req.params.id));
  if (index === -1) return res.status(404).json({ success: false, error: "User not found" });
  users[index] = { ...users[index], ...req.body };
  res.json({ success: true, data: users[index] });
});

// DELETE user
app.delete("/users/:id", (req: Request<{ id: string }>, res: Response) => {
  const index = users.findIndex((u) => u.id === Number(req.params.id));
  if (index === -1) return res.status(404).json({ success: false, error: "User not found" });
  users.splice(index, 1);
  res.status(204).send();
});

// ─── Global Error Handler ────────────────────────────
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ success: false, error: "Internal Server Error" });
});

// ─── Start Server ─────────────────────────────────────
app.listen(3000, () => console.log("Server running on http://localhost:3000"));
```

---

## 10. Working with Databases

### Using `pg` (PostgreSQL) with TypeScript

```typescript
import { Pool, QueryResult } from "pg";

const pool = new Pool({
  host:     process.env.DB_HOST     || "localhost",
  port:     Number(process.env.DB_PORT) || 5432,
  database: process.env.DB_NAME     || "mydb",
  user:     process.env.DB_USER     || "postgres",
  password: process.env.DB_PASSWORD || "password",
});

interface User {
  id: number;
  name: string;
  email: string;
  created_at: Date;
}

// Generic query helper
async function query<T>(text: string, params?: unknown[]): Promise<T[]> {
  const result: QueryResult<T> = await pool.query(text, params);
  return result.rows;
}

// CRUD operations
async function createUser(name: string, email: string): Promise<User> {
  const [user] = await query<User>(
    "INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *",
    [name, email]
  );
  return user;
}

async function getUserById(id: number): Promise<User | null> {
  const rows = await query<User>("SELECT * FROM users WHERE id = $1", [id]);
  return rows[0] ?? null;
}

async function updateUser(id: number, name: string): Promise<User | null> {
  const rows = await query<User>(
    "UPDATE users SET name = $1 WHERE id = $2 RETURNING *",
    [name, id]
  );
  return rows[0] ?? null;
}

async function deleteUser(id: number): Promise<boolean> {
  const result = await pool.query("DELETE FROM users WHERE id = $1", [id]);
  return (result.rowCount ?? 0) > 0;
}
```

---

## 11. Environment Variables

```bash
# .env file
NODE_ENV=development
PORT=3000
DB_HOST=localhost
DB_PORT=5432
DB_NAME=mydb
JWT_SECRET=supersecretkey
```

```typescript
// config.ts
import dotenv from "dotenv";
dotenv.config();

interface Config {
  port: number;
  nodeEnv: string;
  db: {
    host: string;
    port: number;
    name: string;
  };
  jwtSecret: string;
}

function getRequiredEnv(key: string): string {
  const value = process.env[key];
  if (!value) throw new Error(`Missing required env variable: ${key}`);
  return value;
}

export const config: Config = {
  port:    Number(process.env.PORT) || 3000,
  nodeEnv: process.env.NODE_ENV || "development",
  db: {
    host: process.env.DB_HOST || "localhost",
    port: Number(process.env.DB_PORT) || 5432,
    name: process.env.DB_NAME || "mydb",
  },
  jwtSecret: getRequiredEnv("JWT_SECRET"),
};
```

---

## 12. TypeScript Configuration

```jsonc
// tsconfig.json
{
  "compilerOptions": {
    "target":           "ES2022",           // Output JS version
    "module":           "commonjs",         // Module system
    "lib":              ["ES2022"],         // TypeScript libs
    "outDir":           "./dist",           // Output directory
    "rootDir":          "./src",            // Source directory
    "strict":           true,               // Enable all strict checks
    "esModuleInterop":  true,               // CommonJS default imports
    "resolveJsonModule":true,               // Import JSON files
    "declaration":      true,               // Generate .d.ts files
    "declarationMap":   true,               // Source maps for .d.ts
    "sourceMap":        true,               // Source maps for debugging
    "noUnusedLocals":   true,               // Error on unused vars
    "noUnusedParameters": true,             // Error on unused params
    "noImplicitReturns":  true,             // All code paths must return
    "skipLibCheck":     true,               // Skip checking node_modules
    "forceConsistentCasingInFileNames": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist", "**/*.test.ts"]
}
```

---

## 13. Best Practices

### ✅ Do

```typescript
// 1. Use typed interfaces for all data structures
interface RequestBody {
  name: string;
  email: string;
  age?: number;
}

// 2. Use async/await over callbacks
async function fetchData(url: string): Promise<unknown> {
  const res = await fetch(url);
  return res.json();
}

// 3. Validate environment variables at startup
const PORT = Number(process.env.PORT);
if (isNaN(PORT)) throw new Error("PORT must be a number");

// 4. Use dependency injection
class UserService {
  constructor(private readonly db: DatabasePool) {}

  async findById(id: number) {
    return this.db.query("SELECT * FROM users WHERE id = $1", [id]);
  }
}

// 5. Handle errors explicitly
async function safeOperation(): Promise<void> {
  try {
    await riskyTask();
  } catch (err) {
    if (err instanceof AppError) {
      // handle known errors
    } else {
      throw err; // re-throw unknown errors
    }
  }
}
```

### ❌ Don't

```typescript
// 1. Don't use 'any' type
const data: any = fetchUser(); // ❌
const data: User = await fetchUser(); // ✅

// 2. Don't ignore promise rejections
fetchData().then(console.log); // ❌ (missing .catch)
fetchData().then(console.log).catch(console.error); // ✅

// 3. Don't put secrets in code
const secret = "hardcoded-secret"; // ❌
const secret = process.env.SECRET; // ✅

// 4. Don't use synchronous methods in request handlers
app.get("/", (req, res) => {
  const data = fs.readFileSync("./file"); // ❌ blocks event loop
  const data = await fsPromises.readFile("./file"); // ✅
});
```

---

## 14. Node.js Architecture Diagram

```
┌────────────────────────────────────────────────────────┐
│                    Your Application                     │
│               (TypeScript / JavaScript)                 │
└──────────────────────┬─────────────────────────────────┘
                       │
┌──────────────────────▼─────────────────────────────────┐
│                    Node.js APIs                         │
│   fs  │  http  │  crypto  │  events  │  stream  │ ...  │
└──────────────────────┬─────────────────────────────────┘
                       │
┌──────────────────────▼─────────────────────────────────┐
│                   Node.js Bindings (C++)                │
└──────┬──────────────────────────────────────┬──────────┘
       │                                      │
┌──────▼──────┐                    ┌──────────▼──────────┐
│  V8 Engine  │                    │    libuv Library     │
│ (Executes   │                    │  ┌───────────────┐  │
│  JavaScript)│                    │  │  Event Loop   │  │
│             │                    │  │  Thread Pool  │  │
│  JIT Compile│                    │  │  I/O Polling  │  │
└─────────────┘                    │  └───────────────┘  │
                                   └─────────────────────┘
```

---

## Quick Reference — Cheat Sheet


| Concept        | Use Case               | Syntax                          |
| -------------- | ---------------------- | ------------------------------- |
| `require`      | Import module (CJS)    | `const fs = require('fs')`      |
| `import`       | Import module (ESM/TS) | `import fs from 'fs'`           |
| `async/await`  | Async operations       | `const data = await fn()`       |
| `Promise.all`  | Parallel async         | `await Promise.all([p1, p2])`   |
| `EventEmitter` | Custom events          | `emitter.on('event', cb)`       |
| `process.env`  | Environment vars       | `process.env.PORT`              |
| `__dirname`    | Current directory      | `path.join(__dirname, 'file')`  |
| `process.exit` | Exit process           | `process.exit(0)`               |
| `setImmediate` | Next iteration         | `setImmediate(() => {})`        |
| `Buffer.from`  | Binary data            | `Buffer.from('hello', 'utf-8')` |


---

## Resources

- 📖 [Node.js Official Docs](https://nodejs.org/en/docs)
- 📖 [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- 📖 [npm Registry](https://www.npmjs.com/)
- 📖 [Express.js Docs](https://expressjs.com/)
- 📖 [Node.js Best Practices](https://github.com/goldbergyoni/nodebestpractices)

---

*Generated with ❤️ — Node.js + TypeScript Guide*