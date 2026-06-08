import { NextFunction, Request, Response } from "express";
import { UserRole } from "../constants/roles";

export const roleMiddleware = (...allowedRoles: UserRole[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    if (!allowedRoles.includes(user.role)) {
      return res.status(403).json({
        success: false,
        message: "Forbidden",
      });
    }

    next();
  };
};
