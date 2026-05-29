import type { NextFunction, Request, Response } from "express";
import {
  createUsersService,
  deleteUsersService,
  getAllUsersService,
  getUsersByIdService,
  updateUsersService,
} from "../models/userModel.js";

// Response function
const handleResponse = (
  res: Response,
  status: number,
  message: string,
  data: unknown = null,
) => {
  return res.status(status).json({
    status,
    message,
    data,
  });
};

// create user 
export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  const { name, email, password } = req.body;

  try {
    const newUser = await createUsersService(name, email, password);
    handleResponse(res, 201, "User created successfully", newUser);
  } catch (err) {
    next(err);
  }
};

// get all user
export const getAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const users = await getAllUsersService();
    handleResponse(res, 200, "User fetched successfully", users);
  } catch (err) {
    next(err);
  }
};

// get user by id
export const getUserById = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      handleResponse(res, 400, "Invalid user id");
      return;
    }

    const user = await getUsersByIdService(Number(id));

    if (!user) {
      handleResponse(res, 404, "User Not Found");
      return;
    }
    handleResponse(res, 200, "User fetched successfully", user);
  } catch (err) {
    next(err);
  }
};

//uodate user
export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  const id = Number(req.params.id);

  if (isNaN(id)) {
    handleResponse(res, 400, "Invalid user id");
    return;
  }

  const { name, email } = req.body;
  try {
    const updatedUser = await updateUsersService(id, name, email);

    if (!updatedUser) {
      handleResponse(res, 404, "User Not Found");
      return;
    }
    handleResponse(res, 200, "User updated successfully", updatedUser);
  } catch (err) {
    next(err);
  }
};

// delete user
export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      handleResponse(res, 400, "Invalid user id");
      return;
    }

    const deletedUser = await deleteUsersService(id);

    if (!deletedUser) {
      handleResponse(res, 404, "User Not Found");
      return;
    }
    handleResponse(res, 200, "User deleted successfully", deletedUser);
  } catch (err) {
    next(err);
  }
};
