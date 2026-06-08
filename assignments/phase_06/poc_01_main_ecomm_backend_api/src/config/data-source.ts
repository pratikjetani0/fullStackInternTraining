import "reflect-metadata";
import { DataSource } from "typeorm";
import { env } from "./env";
import { User } from "../database/entities/User.entity";
import { Product } from "../database/entities/Product.entity";
import { CartItem } from "../database/entities/CartItem.entity";

export const AppDataSource = new DataSource({
  type: "postgres",

  host: env.dbHost,
  port: env.dbPort,

  username: env.dbUser,
  password: env.dbPassword,

  database: env.dbName,

  synchronize: false,

  logging: false,

  entities: [User, Product, CartItem],

  migrations: ["src/database/migrations/*.ts"],

  subscribers: [],
});
