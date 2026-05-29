import "reflect-metadata";

import dotenv from "dotenv";
import { DataSource } from "typeorm";
import { User } from "../entities/User.js";
dotenv.config();

export const AppDataSource = new DataSource({
  type: "postgres",

  host: process.env.DB_HOST || "localhost",

  port: Number(process.env.DB_PORT) || 5432,

  database: process.env.DB_NAME  || "",

  username: process.env.DB_USER || "",

  password: process.env.DB_PASSWORD || "",

  synchronize: true,

  logging: process.env.NODE_ENV === "development",
  
  entities: [User],
});
