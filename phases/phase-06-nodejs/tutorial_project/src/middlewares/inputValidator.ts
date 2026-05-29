import type { NextFunction, Request, Response } from "express";
import { z } from "zod";
// import Joi from "joi";

// Joi SCHEMA
// const userSchema = Joi.object({
//   name: Joi.string().min(3).max(20).required(),
//   email: Joi.string().email().required(),
// });

//Zod SCHEMA
const createUserSchema = z.object({
  name: z
    .string()
    .min(3, "Name must be at least 3 characters")
    .max(20, "Name cannot exceed 20 characters"),
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

const updateUserSchema = z.object({
  name: z
    .string()
    .min(3, "Name must be at least 3 characters")
    .max(20, "Name cannot exceed 20 characters"),
  email: z.string().email("Invalid email format"),
});

// Joi Validatore
// const validateUser = (req: Request, res: Response, next: NextFunction) => {
//   const { error } = userSchema.validate(req.body);
//   if (error) {
//     return res
//       .status(400)
//       .json({ status: 400, message: error.details[0]?.message });
//   }
//   next();
// };

// Zod Validator
export const validateCreateUser = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const result = createUserSchema.safeParse(req.body);

 
  if (!result.success) {
    return res.status(400).json({
      status: 400,
      message: result.error.issues[0]?.message,
    });
  }

  next();
};

export const validateUpdateUser = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const result = updateUserSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({
      status: 400,
      message: result.error.issues[0]?.message,
    });
  }

  next();
};


