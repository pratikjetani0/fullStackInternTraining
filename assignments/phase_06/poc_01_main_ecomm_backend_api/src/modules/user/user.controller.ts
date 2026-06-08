import { Request, Response } from "express";
import {
  createUserService,
  deleteUserService,
  getUserByIdService,
  updateUserService,
} from "./user.service";

// CRETAE USER (DUPLICATE CODE BEACUSE BE HAVE REGISTER ROUTE NOW)
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

//GET ME(USER)
export const getMe = async (req: Request, res: Response) => {
  try {
    const user = await getUserByIdService(req.user!.userId);

    return res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

//PUT UPDATE USER
export const updateMe = async (req: Request, res: Response) => {
  try {
    const user = await updateUserService(req.user!.userId, req.body);

    return res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

//DELETE USER
export const deleteMe = async (req: Request, res: Response) => {
  try {
    await deleteUserService(req.user!.userId);

    return res.status(200).json({
      success: true,
      message: "Account deleted successfully",
    });
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
