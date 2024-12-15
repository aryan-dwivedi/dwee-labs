import { logger } from "@/server";
import { ServiceResponse } from "@/utils/serviceResponse";
import type { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

export const errorMiddleware = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  logger.error(err);

  const statusCode = err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
  const message = err.message || "Internal Server Error";

  const serviceResponse = ServiceResponse.failure(message, null, statusCode);

  res.status(statusCode).json(serviceResponse);
};
