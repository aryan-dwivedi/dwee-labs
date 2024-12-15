import { env } from "@/utils/envConfig";
import { handleServiceResponse } from "@/utils/httpHandlers";
import { ServiceResponse } from "@/utils/serviceResponse";
import type { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

class AuthMiddleware {
  auth = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { authorization } = req.headers;

      if (!authorization) {
        return handleServiceResponse(
          ServiceResponse.failure(
            "Unauthorized",
            null,
            StatusCodes.UNAUTHORIZED
          ),
          res
        );
      }

      if (authorization === env.AUTH_KEY) {
        return next();
      } else {
        return handleServiceResponse(
          ServiceResponse.failure(
            "Unauthorized",
            null,
            StatusCodes.UNAUTHORIZED
          ),
          res
        );
      }
    } catch (error: any) {
      return handleServiceResponse(
        ServiceResponse.failure(error.message, null, StatusCodes.BAD_REQUEST),
        res
      );
    }
  };
}

export default new AuthMiddleware();
