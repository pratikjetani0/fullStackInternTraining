import dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT || 3000;

// import { addition, subtraction, multiplication, division } from './calculate.js';

// const calculate = require('./calculate.js');

// console.log('Hello World');

// function greet(name) {
//     console.log(`Hello ${name}`);
// }

// greet('Pratik');

// console.log(window); // undefined in node

// console.log(global); // global object in node

// calculate.addition(10, 20);
// calculate.subtraction(10, 20);
// calculate.multiplication(10, 20);
// calculate.division(10, 20);

// addition(10, 20);
// subtraction(10, 20);
// multiplication(10, 20);
// division(10, 20);

// const cp = require('child_process');

// cp.execSync('calc');

// cp.execSync('start chrome')

// cp.execSync("start chrome https://pratikjetani.vercel.app/");

// const os = require("os");

// console.log(os.arch()); // architecture 64 or 32

// console.log(os.platform()); //win32

// console.log(os.networkInterfaces());

// console.log(os.cpus());

// const path = require("path");

// const exe = path.extname(
//   "D:\\prac.fullStackInternTraining-Pratik\\phases\\phase-06-nodejs\\tutorial\\test.txt",
// );

// let baseName = path.basename(
//   "D:\\prac.fullStackInternTraining-Pratik\\phases\\phase-06-nodejs\\tutorial\\test.txt",
// );

// console.log(exe);

// console.log(baseName);

// console.log(__filename);

// console.log(__dirname);

// const fs = require("fs");

// const read = fs.readFileSync('test.txt', 'utf-8')

// console.log(read);

// fs.writeFileSync('test.txt', 'i am over written')

// fs.appendFileSync('test.txt', 'hello i want to append in the file')

// fs.unlinkSync('test.txt')

// fs.mkdirSync('test')

// const dirPath =
//   "D:\\prac.fullStackInternTraining-Pratik\\phases\\phase-06-nodejs\\tutorial\\test";

// const checkFolderFiles = fs.readdirSync(dirPath)

// console.log(checkFolderFiles);

// const dirExist = fs.existsSync('test')

// console.log(dirExist);

// fs.rmdirSync('test')

// fs.readFile("file.txt", "utf8", (err, data) => {
//   if (err) throw err;
//   console.log(data);
// });

// fs.writeFile("file.txt", "Hello World!", (err) => {
//   if (err) throw err;
//   console.log("File written!");
// });

// fs.appendFile("file.txt", "\nAppended text", (err) => {
//   if (err) throw err;
//   console.log("Text appended!");
// });

// const figlet = require('figlet')

// figlet("Hello Pratik!", function (err, data) {
//   if (err) {
//     console.log("Something went wrong...");
//     console.dir(err);
//     return;
//   }
//   console.log(data);
// });

// const http = require("http");

// const server = http.createServer((req, res) => {
//   res.writeHead(200, { "content-type": "text/plain " });
//   res.end("Hello world");
// });

// server.listen(3000, () => {
//   console.log("Server running at 3000 port");
// });

// const server = http.createServer((req, res) => {
//   if (req.url === "/") {
//     res.writeHead(200, { "Content-Type": "text/plain" });
//     res.end("Home Page");
//   } else if (req.url === "/about") {
//     res.writeHead(200, { "Content-Type": "text/plain" });
//     res.end("About Page");
//   } else {
//     res.writeHead(404, { "Content-Type": "text/plain" });
//     res.end("Page Not Found");
//   }
// });

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

// server.listen(3000, () => {
//   console.log("Server running at 3000 port");
// });

// =====================================================================================================================

// Express

// const express = require("express");
// const myMiddlewareFun = require("./middelware/middle");
// const morgan = require("morgan");

// const app = express();

// let products = [
//   { id: 1, name: "iphone" },
//   { id: 2, name: "laptop" },
//   { id: 3, name: "shirt" },
// ];

// app.get("/", (req, res) => {
//   res.send("Hello World");
// });

// app.get("/about", (req, res) => {
//   res.send("About page");
// });

// Route Parameter
// app.get("/products/:id", (req, res) => {
//   res.send(req.params.id);
// })

//Multiple Route Handling
// app.get("/products/:id", (req, res) => {
//   let product = products.find(
//     (product) => product.id === parseInt(req.params.id),
//   );

//   res.send(product);
// });

// app.get("/products/:productname", (req, res) => {
//   let product = products.find(
//     (product) => product.name === req.params.productname,
//   );

//   if (!product)
//     res.status(404).send("The product you are seraching not available.");
//   res.send(product);
// });

// app.use(express.json());

// app.get("/products", (req, res) => {
//   res.send(products);
// });

// POST for create the product
// app.post("/products", (req, res) => {
//   const product = {
//     id: products.length + 1,
//     name: req.body.name,
//   };

//   products.push(product);
//   res.send(product);
// });

// PUT for the update the product

// app.put("/products/:productname", (req, res) => {
//   let product = products.find(
//     (product) => product.name === req.params.productname,
//   );

//   if (!product)
//     res.status(404).send("The product you are seraching not available.");

//   product.name = req.body.name;
//   res.send(product);
// });

//DELETE for delete product with id(most prefer) and name

// app.delete("/products/:id", (req, res) => {
//   let product = products.filter(
//     (product) => product.id !== parseInt(req.params.id),
//   );

//   products = product;

//   res.send(products);
// });

// app.delete("/products/:productname", (req, res) => {
//   let updatedProduct = products.filter(
//     (product) => product.name !== req.params.productname,
//   );
//   products = updatedProduct;

//   res.send(products);
// });

// app.listen(process.env.PORT, () => {
//   console.log(`Server running on ${process.env.PORT}`);
// });

// Middleware

// app.use(express.json());

// app.use(myMiddlewareFun.myMiddleware);

// app.use(morgan('tiny'));

// app.use(myMiddlewareFun.myMiddlewareSec)

// app.get("/products", (req, res) => {
//   res.send(products);
// });

//Promises

// const placeOrder = (drink) => {
//   return new Promise((res, rej) => {
//     if (drink === "coffee") {
//       res("Order for Coffee is recieved");
//     } else {
//       rej("There orders Rejeacted");
//     }
//   });
// };

// const processOrder = (order) => {
//   return new Promise((res) => {
//     console.log("Order is being Processed");
//     res(`${order} and it served.`);
//   });
// };

// placeOrder("coffee")
//   .then((result) => {
//     console.log(result);

//     let orderIsServed = processOrder(result);
//     return orderIsServed;
//   })
//   .then((result) => {
//     console.log(result);
//   })
//   .catch((error) => {
//     console.log(error);
//   });

// ASYNC

// const serveOrder = async () => {
//   try {
//     let orderPlaced = await placeOrder("coffee");
//     let processOrderd = await processOrder(orderPlaced);

//     console.log(processOrderd);
//   } catch (error) {
//     console.log(error);
//   }
// };

// serveOrder();

// CONNECTION WITH POSTGRES

// import { Pool } from "pg";
// import express from "express";

// const app = express();
// app.use(express.json());

// const pool = new Pool({
//   host: process.env.DB_HOST,
//   port: process.env.DB_PORT,
//   database: process.env.DB_NAME,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
// });

// pool.connect();

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

// console.log("first");

// try {
//   const result = await pool.query("SELECT full_name, email FROM customers");
//   console.log(result.rows);
// } catch (error) {
//   console.log(error.message);
// }
// // console.log("hello");

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

// app.get("/customers", async (req, res) => {
//   try {
//     const result = await pool.query(
//       "SELECT * FROM customers ORDER BY customer_id",
//     );

//     res.json(result.rows);
//   } catch (error) {
//     res.status(500).json({
//       error: error.message,
//     });
//   }
// });

// app.post("/customers", async (req, res) => {
//   const { full_name, email, phone } = req.body;

//   try {
//     const result = await pool.query(
//       `INSERT INTO customers(full_name, email, phone) VALUES ($1, $2, $3) RETURNING *`,
//       [full_name, email, phone],
//     );

//     res.status(201).json({
//       message: "Customer created successfully",
//       customer: result.rows[0],
//     });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// import express from "express";
// import createTestTable from "./model/testModel.js";

// const app = express();
// app.use(express.json());

// CREATE TABLES
// createTestTable()

// app.get("/", (req, res) => {
//   res.send("Server Running");
// });

// app.listen(PORT, () => {
//   console.log(`Server running on ${PORT}`);
// });

// console.log("1: Log"); // Synchronous

// setTimeout(() => {
//   console.log("3: Timeout"); // Macrotask
// }, 0);

// await Promise.resolve().then(() => {
//   console.log("2: Promise"); // Microtask
// });

// console.log("Last");

// Output Order:
// 1: Log
// last
// 2: Promise
// 3: Timeout


