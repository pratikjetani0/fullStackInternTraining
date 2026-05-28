# 🟢 Node.js + Express.js

## What is Node.js?

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

## How Node.js Works

Node.js uses a single-threaded event loop to handle asynchronous operations. Key components:

- **Event Loop** — Manages the execution of code, delegates tasks to worker threads.
- **Libuv** — Handles I/O operations asynchronously using threads.
- **V8 Engine** — Executes JavaScript code.
- **Non-blocking I/O** — Operations like file reading or network requests don't block the main thread.

When a task is initiated (e.g., reading a file), it's handed off to Libuv, and the event loop continues. Once complete, a callback is executed.

**Blocking vs Non-Blocking:**

- **Blocking Operations** (Synchronous) — return result directly in a variable.
- **Non-Blocking Operations** (Asynchronous) — return result in a callback function.

- If an operation is **non-blocking**, the Event Loop executes it directly and returns the response to the client.  
- If an operation is **blocking**, it goes to the **Thread Pool**, completes work there, then returns the result to the Event Loop, which sends the response to the client.

> By default, the size of the Thread Pool is **4**. Max size depends on your CPU core count.

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
   │  │  check (setImmediate)│   │
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

## Modules

Modules are small units of code that can be reused across a program. They can be imported and exported between files.

### CommonJS vs ES6 Modules

```js
// CommonJS (require/module.exports)
const calculate = require("./calculate.js");

calculate.addition(10, 20);
calculate.subtraction(10, 20);
calculate.multiplication(10, 20);
calculate.division(10, 20);

// ES6 Modules (import/export)
import {
  addition,
  subtraction,
  multiplication,
  division,
} from "./calculate.js";

addition(10, 20);
subtraction(10, 20);
multiplication(10, 20);
division(10, 20);
```

| Feature      | CommonJS (`require`)           | ES6 Modules (`import`)                        |
| ------------ | ------------------------------ | --------------------------------------------- |
| Syntax       | `require()` / `module.exports` | `import` / `export`                           |
| Loading      | Synchronous                    | Asynchronous                                  |
| Tree Shaking | ❌ Not supported               | ✅ Supported (removes unused code)            |
| Used in      | Node.js (default)              | Modern JS / Node.js (with `"type": "module"`) |

---

## Built-in Modules

### Child Process Module

Used to create a subprocess within your script. You can perform different tasks using methods like `spawn`, `exec`, `execFile`, and `fork`.

```js
const cp = require("child_process");

cp.execSync("calc"); // Opens calculator
cp.execSync("start chrome"); // Opens Chrome
cp.execSync("start chrome https://pratikjetani.vercel.app/"); // Opens URL in Chrome
```

### OS Module

```js
const os = require("os");

console.log(os.arch()); // architecture: x64 or x32
console.log(os.platform()); // win32 / linux / darwin
console.log(os.networkInterfaces()); // network interface details
console.log(os.cpus()); // info about each CPU core
```

### Path Module

```js
const path = require("path");

const ext = path.extname("D:\\tutorial\\test.txt");
console.log(ext); // .txt

const baseName = path.basename("D:\\tutorial\\test.txt");
console.log(baseName); // test.txt

console.log(__filename); // full path to current file
console.log(__dirname); // full path to current directory
```

### FS Module

```js
const fs = require("fs");

// Synchronous (Blocking)
const read = fs.readFileSync("test.txt", "utf-8");
console.log(read);

fs.writeFileSync("test.txt", "i am over written");
fs.appendFileSync("test.txt", "hello i want to append in the file");
fs.unlinkSync("test.txt"); // delete file

fs.mkdirSync("test"); // create directory
const files = fs.readdirSync("test"); // list files in directory
const exists = fs.existsSync("test"); // check if directory exists
fs.rmdirSync("test"); // remove directory

// Asynchronous (Non-Blocking)
fs.readFile("file.txt", "utf8", (err, data) => {
  if (err) throw err;
  console.log(data);
});

fs.writeFile("file.txt", "Hello World!", (err) => {
  if (err) throw err;
  console.log("File written!");
});

fs.appendFile("file.txt", "\nAppended text", (err) => {
  if (err) throw err;
  console.log("Text appended!");
});
```

---

## NPM

NPM (Node Package Manager) is the default package manager for Node.js. It allows you to install, manage, and share JavaScript packages.

```bash
npm init -y              # initialize a new project
npm install express      # install a package
npm install -D nodemon   # install as dev dependency
npm uninstall express    # remove a package
npm list                 # list installed packages
```

### Semantic Versioning

Node.js packages follow the **MAJOR.MINOR.PATCH** format:

- **MAJOR** — Breaking changes (incompatible API)
- **MINOR** — New features (backward compatible)
- **PATCH** — Bug fixes (backward compatible)

### Version Ranges in `package.json`

```json
{
  "dependencies": {
    "express": "^4.18.2", // Caret: updates MINOR and PATCH
    "lodash": "~4.17.21", // Tilde: updates PATCH only
    "axios": "1.6.0", // Exact version
    "mongoose": ">=5.0.0 <6.0.0" // Range
  }
}
```

---

## Building an HTTP Server in Node.js

Use the built-in `http` module to create a simple server.

```js
const http = require("http");

const server = http.createServer((req, res) => {
  res.writeHead(200, { "content-type": "text/plain" });
  res.end("Hello world");
});

server.listen(3000, () => {
  console.log("Server running at 3000 port");
});
```

Run with `node server.js`. Visit `http://localhost:3000` in a browser.

---

## Handling URLs in Node.js

URL stands for **Uniform Resource Locator**. Use `req.url` to get the requested path.

```js
const server = http.createServer((req, res) => {
  if (req.url === "/") {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("Home Page");
  } else if (req.url === "/about") {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("About Page");
  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Page Not Found");
  }
});

server.listen(3000, () => {
  console.log("Server running at 3000 port");
});
```

---

## HTTP Methods

HTTP methods define the action to be performed on a resource:

| Method   | Purpose                            |
| -------- | ---------------------------------- |
| `GET`    | Retrieve data from the server      |
| `POST`   | Send and mutate data on the server |
| `PUT`    | Replace/update an entire resource  |
| `PATCH`  | Partially update a resource        |
| `DELETE` | Remove a resource                  |

Use `req.method` to check the method in Node.js:

```js
const server = http.createServer((req, res) => {
  if (req.method === "GET" && req.url === "/") {
    res.end("GET request to home");
  } else if (req.method === "POST" && req.url === "/submit") {
    res.end("POST request to submit");
  } else {
    res.writeHead(405);
    res.end("Method Not Allowed");
  }
});

server.listen(3000, () => {
  console.log("Server running at 3000 port");
});
```

---

## What is Express.js?

Express.js is a lightweight, fast, and minimal web framework built on top of Node.js. It simplifies:

- Creating servers
- Handling routes
- Building REST APIs
- Middleware management
- Scalable application architecture

```js
const express = require("express");

const app = express();
app.use(express.json());

// Basic Routes
app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/about", (req, res) => {
  res.send("About page");
});

// Route Parameter
app.get("/product/:id", (req, res) => {
  res.send(req.params.id);
});

// GET all products
app.get("/products", (req, res) => {
  res.send(products);
});

// GET product by name
app.get("/products/:productname", (req, res) => {
  let product = products.find(
    (product) => product.name === req.params.productname,
  );

  if (!product)
    res.status(404).send("The product you are searching not available.");
  res.send(product);
});

// POST - create a product
app.post("/products", (req, res) => {
  const product = {
    id: products.length + 1,
    name: req.body.name,
  };

  products.push(product);
  res.send(product);
});

// PUT - update a product
app.put("/products/:productname", (req, res) => {
  let product = products.find(
    (product) => product.name === req.params.productname,
  );

  if (!product)
    res.status(404).send("The product you are searching not available.");

  product.name = req.body.name;
  res.send(product);
});

// DELETE - delete a product by id
app.delete("/products/:id", (req, res) => {
  let product = products.filter(
    (product) => product.id !== parseInt(req.params.id),
  );

  products = product;

  res.send(products);
});

app.listen(process.env.PORT, () => {
  console.log(`Server running on ${process.env.PORT}`);
});
```

---

## What is REST API?

REST stands for **Representational State Transfer**. A REST API allows **client and server to communicate using HTTP requests**.

### REST Principles

- **Client–Server** architecture — frontend and backend are separate
- **Stateless** — each request contains all the info needed; no session on server
- **Uniform Interface** — uses standard HTTP methods and URLs
- **Resource-based** — everything is a resource accessed via a URL

### Example Endpoints

```
GET    /users       → get all users
POST   /users       → create a new user
GET    /users/1     → get user with id 1
PUT    /users/1     → update user with id 1
DELETE /users/1     → delete user with id 1
```

---

## What is Postman?

Postman is a tool used to test APIs — send HTTP requests and inspect responses without needing a frontend.

**Common Uses:**

- Send GET, POST, PUT, DELETE requests
- Pass request body (JSON)
- Test headers and auth tokens
- Debug API responses

**Example POST request:**

- Method: `POST`
- URL: `http://localhost:3000/products`
- Body (JSON):

```json
{
  "name": "iphone"
}
```

---

## Express Middleware

### What is Middleware?

Middleware is a function that runs **between the request and the response**. It has access to `req`, `res`, and `next`.

```
Request → Middleware 1 → Middleware 2 → Route Handler → Response
```

### Types of Middleware

1. **Built-in** — comes with Express
2. **Custom** — written by you
3. **Third-party** — installed via npm

### Custom Middleware Example

```js
app.use((req, res, next) => {
  console.log("Request received");
  next(); // must call next() to pass to the next middleware
});
```

### Built-in Middleware

```js
app.use(express.json()); // parses incoming JSON requests
app.use(express.urlencoded({ extended: true })); // parses URL-encoded data
app.use(express.static("public")); // serves static files from 'public' folder
```

### Third-party Middleware

```bash
npm install morgan
```

```js
const morgan = require("morgan");
app.use(morgan("tiny")); // logs each request: method, url, status, response time
```

---

## Async Programming

### What is Async Programming?

Async programming allows your program to start a long-running task (like reading a file or fetching data) and continue executing other code without waiting for that task to finish. When the task is done, the result is handled via a **callback**, **Promise**, or **async/await**.

This is critical in Node.js since it is single-threaded — blocking the thread would halt the entire server.

---

### Callbacks

A **callback** is a function passed as an argument to another function and executed after an async task completes.

```js
setTimeout(() => {
  console.log("Executed after 2 seconds");
}, 2000);

setInterval(() => {
  console.log("Runs every 1 second");
}, 1000);

// File read with callback
fs.readFile("file.txt", "utf8", (err, data) => {
  if (err) throw err;
  console.log(data);
});
```

**Callback Hell** — deeply nested callbacks become hard to read and maintain:

```js
doTask1((result1) => {
  doTask2(result1, (result2) => {
    doTask3(result2, (result3) => {
      console.log(result3); // deeply nested = "callback hell"
    });
  });
});
```

---

### Callback Queue and Event Loop

When an async operation completes (e.g., a `setTimeout` fires), its callback is placed in the **Callback Queue**. The **Event Loop** continuously checks if the **Call Stack** is empty — if it is, it picks the next callback from the queue and pushes it onto the stack for execution.

```
Call Stack → empty? → Event Loop picks from Callback Queue → executes callback
```

---

### Promises

A **Promise** represents a value that will be available in the future. It can be in one of three states: `pending`, `fulfilled`, or `rejected`.

```js
const placeOrder = (drink) => {
  return new Promise((res, rej) => {
    if (drink === "coffee") {
      res("Order for Coffee is received");
    } else {
      rej("Order Rejected");
    }
  });
};

const processOrder = (order) => {
  return new Promise((res) => {
    console.log("Order is being Processed");
    res(`${order} and it served.`);
  });
};

placeOrder("coffee")
  .then((result) => {
    console.log(result);
    let orderIsServed = processOrder(result);
    return orderIsServed;
  })
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.log(error);
  });
```

---

### async/await

`async/await` is syntactic sugar over Promises — it makes async code look and behave like synchronous code.

```js
const serveOrder = async () => {
  try {
    let orderPlaced = await placeOrder("coffee");
    let processOrderd = await processOrder(orderPlaced);

    console.log(processOrderd);
  } catch (error) {
    console.log(error);
  }
};

serveOrder();
```

---

### Microtask Queue

The **Microtask Queue** has higher priority than the Callback Queue. It is processed **after the current operation completes** but **before the next event loop iteration** begins.

Items in the microtask queue:

- `.then()` / `.catch()` / `.finally()` callbacks (Promises)
- `queueMicrotask()`

```js
console.log("Start");

setTimeout(() => console.log("setTimeout"), 0); // Callback Queue

Promise.resolve().then(() => console.log("Promise")); // Microtask Queue

console.log("End");

// Output:
// Start
// End
// Promise   ← microtask runs before setTimeout
// setTimeout
```

---

### Sequential vs Parallel Execution

**Sequential** — tasks run one after another. Each `await` waits for the previous to finish.

```js
const sequential = async () => {
  const result1 = await task1(); // waits for task1
  const result2 = await task2(); // then waits for task2
  console.log(result1, result2);
};
```

**Parallel** — tasks run at the same time using `Promise.all`. Faster when tasks are independent.

```js
const parallel = async () => {
  const [result1, result2] = await Promise.all([task1(), task2()]);
  console.log(result1, result2);
};
```

> Use **sequential** when task2 depends on task1's result. Use **parallel** when tasks are independent to save time.

---

## PostgreSQL with Node.js

### Pool Setup (`config/db.js`)

```js
import dotenv from "dotenv";
dotenv.config();

import pg from "pg";

const { Pool } = pg;

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

export default pool;
```

### Creating Schema and Table (`model/testModel.js`)

```js
import pool from "../config/db.js";

async function createTestTable() {
  try {
    // CREATE SCHEMA
    await pool.query(`
      CREATE SCHEMA IF NOT EXISTS test
    `);

    console.log("Schema created");

    // CREATE TABLE
    await pool.query(`
        CREATE TABLE IF NOT EXISTS test.tests (
            test_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
            test_name VARCHAR(20) NOT NULL,
            email VARCHAR(50) UNIQUE NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    `);

    console.log("Customers table created");
  } catch (error) {
    console.log(error.message);
  }
}

export default createTestTable;
```

### Express App with PostgreSQL (`index.js`)

```js
import express from "express";
import createTestTable from "./model/testModel.js";

const app = express();
app.use(express.json());

// CREATE TABLES ON STARTUP
createTestTable();

app.get("/", (req, res) => {
  res.send("Server Running");
});

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
```

### CRUD Routes with PostgreSQL

```js
import { Pool } from "pg";
import express from "express";

const app = express();
app.use(express.json());

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

pool.connect();

// GET all customers
app.get("/customers", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM customers ORDER BY customer_id",
    );

    res.json(result.rows);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
});

// POST - create a customer
app.post("/customers", async (req, res) => {
  const { full_name, email, phone } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO customers(full_name, email, phone) VALUES ($1, $2, $3) RETURNING *`,
      [full_name, email, phone],
    );

    res.status(201).json({
      message: "Customer created successfully",
      customer: result.rows[0],
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
```
