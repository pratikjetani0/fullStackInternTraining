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
