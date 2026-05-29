// Centralized error handling

import type { NextFunction, Request, Response } from "express";

const errorHandler = (
  err: Error & { statusCode?: number },
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.log(err.stack);

  const status = err.statusCode ?? 500;
  const message = status === 500 ? "Something went wrong." : err.message;

  res.status(500).json({
    status,
    message,
    ...(status === 500 && { error: err.message }),
  });
};

export default errorHandler;
