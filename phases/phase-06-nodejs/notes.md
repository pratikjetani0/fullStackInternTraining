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

Event Loop: Manages the execution of code, delegates tasks to worker threads.
Libuv: Handles I/O operations asynchronously using threads.
V8 Engine: Executes JavaScript code.
Non-blocking I/O: Operations like file reading or network requests don't block the main thread.
When a task is initiated (e.g., reading a file), it's handed off to Libuv, and the event loop continues. Once complete, a callback is executed.

Example flow:

Code runs in the event loop.
Asynchronous task is delegated.
Event loop continues.
Callback is queued when task finishes.
nodejs

Blocking Oprations - (Synchrouns tasks) - return result in the variable also

Non-Blocking Oprations - (Asynchrouns tasks) - return result in the call back function

Event Loop if that task is non-blocking oprations then they direct executes and return the response to client.

If that opration is Blocking oprations then they goes Thread Pool for work and then return result and then they return the response to client.

By default size of Thread Pool is == 4

max size of dependents on you cpu core count

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

import { addition, subtraction, multiplication, division } from './calculate.js';
const calculate = require('./calculate.js');

calculate.addition(10, 20);
calculate.subtraction(10, 20);
calculate.multiplication(10, 20);
calculate.division(10, 20);

addition(10, 20);
subtraction(10, 20);
multiplication(10, 20);
division(10, 20);

- `import` is used to import modules in ES6 modules.
- `require` is used to import modules in CommonJS modules.

- in eS6 there is tree shaking feature which is used to remove the unused code from the bundle.
- in commonjs there is no tree shaking feature.

```js
import {
  addition,
  subtraction,
  multiplication,
  division,
} from "./calculate.js";
const calculate = require("./calculate.js");

calculate.addition(10, 20);
calculate.subtraction(10, 20);
calculate.multiplication(10, 20);
calculate.division(10, 20);
```

---

## Modules

- Modules are the small units of code that can be reused in a program.
- Modules can be imported and exported from other modules.

## Child Process Module

- used to create a sub process within the script.
- you can perform different tasks with in your script by using this some methods like `spawn`, `exec`, `execFile`, `fork`.

```js
const cp = require("child_process");

// cp.execSync('calc');

// cp.execSync('start chrome')

// cp.execSync("start chrome https://pratikjetani.vercel.app/")
```

## OS module

```js
// console.log(os.arch()); // architecture 64 or 32

// console.log(os.platform()); //win32

// console.log(os.networkInterfaces());

// console.log(os.cpus());
```

## Path module

const path = require("path");

// const exe = path.extname(
// "D:\\prac.fullStackInternTraining-Pratik\\phases\\phase-06-nodejs\\tutorial\\test.txt",
// );

let baseName = path.basename(
"D:\\prac.fullStackInternTraining-Pratik\\phases\\phase-06-nodejs\\tutorial\\test.txt",
);

// console.log(exe);

// console.log(baseName);

console.log(\_\_filename);

console.log(\_\_dirname);

## FS module

const fs = require("fs");

// const read = fs.readFileSync('test.txt', 'utf-8')

// console.log(read);

// fs.writeFileSync('test.txt', 'i am over written')

// fs.appendFileSync('test.txt', 'hello i want to append in the file')

// fs.unlinkSync('test.txt')

// fs.mkdirSync('test')

const dirPath =
"D:\\prac.fullStackInternTraining-Pratik\\phases\\phase-06-nodejs\\tutorial\\test";

// const checkFolderFiles = fs.readdirSync(dirPath)

// console.log(checkFolderFiles);

// const dirExist = fs.existsSync('test')

// console.log(dirExist);

fs.rmdirSync('test')

// fs.readFile("file.txt", "utf8", (err, data) => {
// if (err) throw err;
// console.log(data);
// });

// fs.writeFile("file.txt", "Hello World!", (err) => {
// if (err) throw err;
// console.log("File written!");
// });

// fs.appendFile("file.txt", "\nAppended text", (err) => {
// if (err) throw err;
// console.log("Text appended!");
// });

## NPM

## semantic versioning

Node.js packages follow MAJOR.MINOR.PATCH format:

MAJOR: Breaking changes (incompatible API)
MINOR: New features (backward compatible)
PATCH: Bug fixes (backward compatible)
Version Ranges in package.json
{
"dependencies": {
"express": "^4.18.2", // Caret: updates MINOR and PATCH
"lodash": "~4.17.21", // Tilde: updates PATCH only
"axios": "1.6.0", // Exact version
"mongoose": ">=5.0.0 <6.0.0" // Range
}
}

## Request Response Cycle

## Building an HTTP Server in Node.js

Use the built-in http module to create a simple server.

```js
const http = require("http");

const server = http.createServer((req, res) => {
  res.writeHead(200, { "content-type": "text/plain " });
  res.end("Hello world");
});

server.listen(3000, () => {
  console.log("Server running at 3000 port");
});
```

- Run with node server.js. Visit http://localhost:3000 in a browser.

## Handling URLs in Node.js

- URL (Uniform Resource Locator)
- In an HTTP server, use req.url to get the requested URL.

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

You can parse URLs using the url module for query parameters.

## HTTP Methods

HTTP methods define actions for resources. Common ones:

GET: Retrieve data (e.g., fetch a page). - when you want to get some data from the server.
POST: Send data (e.g., submit a form). - when You want to send and mutate some data in server
PUT: Update a resource.
PATCH: Update a re source.
DELETE: Remove a resource.
In Node.js, check req.method in the server.

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

// const server = http.createServer((req, res) => {
//   if (req.method === "GET" && req.url === "/") {
//     res.end("GET request to home");
//   } else if (req.method === "POST" && req.url === "/submit") {
//     res.end("POST request to submit");
//   } else {
//     res.writeHead(405);
//     res.end("Method Not Allowed");
//   }
// });
```

## What is Express.js?

Express.js is a lightweight framework built on top of Node.js that makes it easy to:

Create servers
Handle routes
Build REST APIs
fast and robust application
middleware
routing
scalability

```js
const express = require("express");

const app = express();

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

//Multiple Route Handling
// app.get("/products/:id", (req, res) => {
//   let product = products.find(
//     (product) => product.id === parseInt(req.params.id),
//   );

//   res.send(product);
// });

app.get("/products/:productname", (req, res) => {
  let product = products.find(
    (product) => product.name === req.params.productname,
  );

  if (!product)
    res.status(404).send("The product you are seraching not available.");
  res.send(product);
});

app.use(express.json());

app.get("/products", (req, res) => {
  res.send(products);
});

// POST for create the product
app.post("/products", (req, res) => {
  const product = {
    id: products.length + 1,
    name: req.body.name,
  };

  products.push(product);
  res.send(product);
});

// PUT for the update the product

app.put("/products/:productname", (req, res) => {
  let product = products.find(
    (product) => product.name === req.params.productname,
  );

  if (!product)
    res.status(404).send("The product you are seraching not available.");

  product.name = req.body.name;
  res.send(product);
});

//DELETE for delete product with id(most prefer) and name

app.delete("/products/:id", (req, res) => {
  let product = products.filter(
    (product) => product.id !== parseInt(req.params.id),
  );

  products = product;

  res.send(products);
});

// app.delete("/products/:productname", (req, res) => {
//   let updatedProduct = products.filter(
//     (product) => product.name !== req.params.productname,
//   );
//   products = updatedProduct;

//   res.send(products);
// });

app.listen(process.env.PORT, () => {
  console.log(`Server running on ${process.env.PORT}`);
});
```

## What is REST API?

### REST API

REST stands for **Representational State Transfer**.

A REST API allows **client and server to communicate using HTTP requests**.

### REST Principles

- Client–Server architecture
- Stateless
- Uses HTTP methods
- Uses resources (URLs)

### Example

```
GET /users
POST /users
GET /users/1
PUT /users/1
DELETE /users/1
```

## What is Postman?

Postman is a tool used to:

- Test APIs
- Send HTTP requests
- Check responses

### Common Uses

- GET data
- Send POST body
- Test headers
- Debug APIs

### Example

- Method: **POST**
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

Middleware is a function that runs **between request and response**.

### Types of Middleware

1. Built-in
2. Custom
3. Third-party

### Example

```js
app.use((req, res, next) => {
  console.log("Request received");
  next();
});
```

### Built-in Middleware

```js
app.use(express.json());
```

### Third-party Middleware

```bash
npm install morgan
```

```js
const morgan = require("morgan");
app.use(morgan("tiny"));
```

---

## Async Programming

### what is async programmin?

### Callbacks(setTimepout, setInterval etc)

### Callback queue and Event loop

### Promises

const placeOrder = (drink) => {
return new Promise((res, rej) => {
if (drink === "coffee") {
res("Order for Coffee is recieved");
} else {
rej("There orders Rejeacted");
}
});
};

const processOrder = (order) => {
return new Promise((res) => {
console.log("Order is being Processed");
res(`${order} and it served.`);
});
};

// placeOrder("coffee")
// .then((result) => {
// console.log(result);

// let orderIsServed = processOrder(result);
// return orderIsServed;
// })
// .then((result) => {
// console.log(result);
// })
// .catch((error) => {
// console.log(error);
// });

### async/await

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

### microtask queue

### sequential and parallel exrcition of code

### postgres connection

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

// pool.query(
//   `INSERT INTO customers(full_name, email, phone) VALUES ($1, $2, $3)`,
//   ["abhi Sharma", "abhi@gmail.com", "6565767788"],
//   (err, res) => {
//     if (!err) {
//       console.log(res.rows);
//     } else {
//       console.log(err.message);
//     }
//   },
// );

// try {
//   const result = await pool.query("SELECT full_name, email FROM customers");
//   console.log(result.rows);
// } catch (error) {
//   console.log(error.message);
// }

// pool.query("SELECT full_name, email FROM customers", (err, res) => {
//   if (!err) {
//     console.log(res.rows);
//   } else {
//     console.log(err.message);
//   }
// });

// pool.query(
//   "SELECT product_name, price FROM products ORDER BY price DESC",
//   (err, res) => {
//     if (!err) {
//       console.log(res.rows);
//     } else {
//       console.log(err.message);
//     }
//   },
// );

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

### DO with the SCHEMA create and table

```js
import express from "express";
import createTestTable from "./model/testModel.js";

const app = express();
app.use(express.json());

// CREATE TABLES
createTestTable();

app.get("/", (req, res) => {
  res.send("Server Running");
});

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
```

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

## TypeORM conncections

```ts
import "reflect-metadata";
import express from "express";
import { AppDataSource } from "./config/data-source.js";
import { Customer } from "./entity/Customer.js";

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 3000;

AppDataSource.initialize()
  .then(async () => {
    console.log("Database Connected");

    //GET API
    app.get("/customers", async (req, res) => {
      try {
        const customerRepository = AppDataSource.getRepository(Customer);

        const customers = await customerRepository.find();

        res.status(200).json(customers);
      } catch (error: any) {
        res.status(500).json({
          message: error.message,
        });
      }
    });

    // POST API (INSERT DATA)
    app.post("/customers", async (req, res) => {
      try {
        const { full_name, email, phone } = req.body;

        const customerRepository = AppDataSource.getRepository(Customer);

        const newCustomer = customerRepository.create({
          full_name,
          email,
          phone,
        });

        const savedCustomer = await customerRepository.save(newCustomer);

        res.status(201).json({
          message: "Customer Created",
          data: savedCustomer,
        });
      } catch (error: any) {
        res.status(500).json({
          message: error.message,
        });
      }
    });

    //PUT UPDATE DATA
    app.put("/customers/:id", async (req, res) => {
      try {
        const customerId = Number(req.params.id);
        const { full_name, email, phone } = req.body;

        const customerRepository = AppDataSource.getRepository(Customer);

        // FIND
        const customer = await customerRepository.findOneBy({
          customer_id: customerId,
        });

        if (!customer) {
          return res.status(404).json({ message: "Customer not found" });
        }

        // UPDATE VALUES
        customer.full_name = full_name;
        customer.email = email;
        customer.phone = phone;

        // SAVE UPDATED DATA
        const updatedCustomer = await customerRepository.save(customer);

        res.json({
          message: "Customer Updated",
          data: updatedCustomer,
        });
      } catch (error: any) {
        res.status(500).json({ message: error.message });
      }
    });

    //DELETE CUSTOMER REMOVE
    app.delete("/customers/:id", async (req, res) => {
      try {
        const customerId = Number(req.params.id);

        const customerRepository = AppDataSource.getRepository(Customer);

        // FIND CUSTOMER
        const customer = await customerRepository.findOneBy({
          customer_id: customerId,
        });

        if (!customer) {
          return res.status(404).json({
            message: "Customer not found",
          });
        }

        // DELETE CUSTOMER
        await customerRepository.remove(customer);

        res.json({
          message: "Customer Deleted",
        });
      } catch (error: any) {
        res.status(500).json({ message: error.message });
      }
    });

    app.listen(PORT, () => {
      console.log(`Server running on ${PORT}`);
    });
  })
  .catch((error) => {
    console.log("DATABASE ERROR:");
    console.log(error.message);
  });
```

```ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from "typeorm";

@Entity({
  schema: "test2",
  name: "customers",
})
export class Customer {
  @PrimaryGeneratedColumn()
  customer_id!: number;

  @Column({
    type: "varchar",
    length: 100,
  })
  full_name!: string;

  @Column({
    type: "varchar",
    unique: true,
  })
  email!: string;

  @Column({
    type: "varchar",
    length: 15,
  })
  phone!: string;

  @CreateDateColumn({
    type: "timestamp",
  })
  created_at!: Date;
}
```

```ts
import "reflect-metadata";

import dotenv from "dotenv";
dotenv.config();

import { DataSource } from "typeorm";
import { Customer } from "../entity/Customer.js";

export const AppDataSource = new DataSource({
  type: "postgres",

  host: process.env.DB_HOST,

  port: Number(process.env.DB_PORT),

  username: process.env.DB_USER,

  password: process.env.DB_PASSWORD,

  database: process.env.DB_NAME,

  synchronize: true,

  logging: true,

  entities: [Customer],
});
```
