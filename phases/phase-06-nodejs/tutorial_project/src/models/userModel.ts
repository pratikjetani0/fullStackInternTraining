import { type QueryResult } from "pg";
import pool from "../config/db.js";
import { type User } from "../types/user.js";
import bcrypt from "bcrypt";

// GET ALL USER
export const getAllUsersService = async () => {
  const result: QueryResult<User> = await pool.query("SELECT * FROM users");
  return result.rows;
};

// GET USER BY ID
export const getUsersByIdService = async (
  id: number,
): Promise<User | undefined> => {
  const result = await pool.query("SELECT * FROM users WHERE id = $1", [id]);

  return result.rows[0];
};

// CREATE USER
export const createUsersService = async (
  name: string,
  email: string,
  password: string,
): Promise<User | undefined> => {
  const existingUser = await pool.query(
    "SELECT id FROM users WHERE email = $1",
    [email],
  );

  if (existingUser.rows.length > 0) {
    throw new Error("Email already exists");
  }

  //HASH PASSWORD
  const saltRounds = 10;
  const hashPassword = await bcrypt.hash(password, saltRounds);

  const result: QueryResult<User> = await pool.query(
    "INSERT INTO users(name, email, password) VALUES ($1, $2, $3) RETURNING *",
    [name, email, hashPassword],
  );
  return result.rows[0];
};

// UPDATE USER BY ID
export const updateUsersService = async (
  id: number,
  name: string,
  email: string,
): Promise<User | undefined> => {
  const result: QueryResult<User> = await pool.query(
    "UPDATE users SET name=$1, email=$2 WHERE id=$3 RETURNING *",
    [name, email, id],
  );

  return result.rows[0];
};

// DELETE USER BY ID
export const deleteUsersService = async (
  id: number,
): Promise<User | undefined> => {
  const result: QueryResult<User> = await pool.query(
    "DELETE FROM users WHERE id=$1 RETURNING *",
    [id],
  );

  return result.rows[0];
};
