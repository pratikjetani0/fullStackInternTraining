import { Request, Response } from "express";
import { loginService, registerService } from "./auth.service";

//REGISTER
export const register = async (req: Request, res: Response) => {
  try {
    const user = await registerService(req.body);

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: user,
    });
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message: error.message || "Registraction failed",
    });
  }
};

//LOGIN
export const login = async (req: Request, res: Response) => {
  try {
    const result = await loginService(req.body);

    return res.status(200).json({
      success: true,
      message: "Login successful",
      data: result,
    });
  } catch (error: any) {
    return res.status(401).json({
      success: false,
      message: error.message || "Login failed",
    });
  }
};

//LOGOUT
export const logout = async (req: Request, res: Response) => {
  return res.status(200).json({
    success: true,
    message: "Logout successful",
  });
};
