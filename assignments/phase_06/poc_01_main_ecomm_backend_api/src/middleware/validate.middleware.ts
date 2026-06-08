import { NextFunction, Request, Response } from "express";
import { treeifyError, ZodType } from "zod";

export const validate = (schema: ZodType) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        success: false,
        error: treeifyError(result.error), // easy to read error
      });
    }

    req.body = result.data;

    next();
  };
};
