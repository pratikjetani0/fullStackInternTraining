import jwt from "jsonwebtoken";
import { env } from "../config/env";

interface TokenPayload {
  userId: string;
  role: string;
}

export const generateToken = (payload: TokenPayload) => {
  return jwt.sign(payload, env.jwtSecret, { expiresIn: "1d" });
};
