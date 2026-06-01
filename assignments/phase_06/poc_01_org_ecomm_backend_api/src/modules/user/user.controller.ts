import { Request, Response } from "express";
import {
  createUserService,
  deleteUserService,
  getUserByIdService,
  getUsersService,
  updateUserService,
} from "./user.service";

// CRETAE USER
export const createUser = async (req: Request, res: Response) => {
  try {
    const user = await createUserService(req.body);

    return res.status(201).json({
      success: true,
      data: user,
    });
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message: error.message || "Something went wrong",
    });
  }
};

//GET USER
export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await getUsersService();

    res.status(200).json({
      success: true,
      data: users,
    });
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message: error.message || "Something went wrong",
    });
  }
};

//GET USER BY ID
export const getUserById = async (req: Request, res: Response) => {
  try {
    const user = await getUserByIdService(req.params.id as string);

    return res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message: error.message || "Something went wrong",
    });
  }
};

//UPDATE USER BY ID
export const updateUser = async (req: Request, res: Response) => {
  try {
    const user = await updateUserService(req.params.id as string, req.body);

    return res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message: error.message || "Something went wrong",
    });
  }
};

//DELETE USER BY ID
export const deleteUser = async (req: Request, res: Response) => {
  try {
    await deleteUserService(req.params.id as string);

    return res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message: error.message || "Something went wrong",
    });
  }
};
