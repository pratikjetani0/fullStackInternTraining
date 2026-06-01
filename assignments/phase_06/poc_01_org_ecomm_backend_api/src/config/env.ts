import dotenv from "dotenv";

dotenv.config();

export const env = {
  port: process.env.PORT || 5000,

  dbHost: process.env.DB_HOST!,
  dbPort: Number(process.env.DB_PORT),
  dbUser: process.env.DB_USERNAME!,
  dbPassword: process.env.DB_PASSWORD!,
  dbName: process.env.DB_NAME!,

  jwtSecret: process.env.JWT_SECRET!,
};
