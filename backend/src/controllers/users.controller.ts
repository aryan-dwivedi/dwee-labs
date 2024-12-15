import { User } from "@/models/user";
import { handleServiceResponse } from "@/utils/httpHandlers";
import { ServiceResponse } from "@/utils/serviceResponse";
import { FileOperations } from "@/utils/fileOperations";
import type { Request, RequestHandler, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { sleep } from "@/utils/sleep";
import { logger } from "@/server";

class UsersController {
  public createUser: RequestHandler = async (req: Request, res: Response) => {
    const { name, email, gender, age } = req.body;

    try {
      const users = await FileOperations.readFile<User>("users");

      const isEmailExists = users.some((user) => user.email === email);

      if (isEmailExists) {
        return handleServiceResponse(
          ServiceResponse.failure(
            "Email already exists",
            null,
            StatusCodes.CONFLICT
          ),
          res
        );
      }

      const user = new User(name, age, gender, email);

      const randomDuration = Math.floor(Math.random() * 1800) + 200;
      await sleep(randomDuration);

      users.push(user);

      await FileOperations.saveFile("users", users);

      return handleServiceResponse(
        ServiceResponse.success("User created successfully", user),
        res
      );
    } catch (error) {
      logger.error(error);
      return handleServiceResponse(
        ServiceResponse.failure(
          "Error creating user",
          null,
          StatusCodes.INTERNAL_SERVER_ERROR
        ),
        res
      );
    }
  };

  public listUsers: RequestHandler = async (req: Request, res: Response) => {
    try {
      const randomDuration = Math.floor(Math.random() * 1800) + 200;
      await sleep(randomDuration);

      const users = await FileOperations.readFile<User>("users");

      if (!users || users.length === 0) {
        return handleServiceResponse(
          ServiceResponse.failure(
            "No users found",
            null,
            StatusCodes.NOT_FOUND
          ),
          res
        );
      }

      return handleServiceResponse(
        ServiceResponse.success("Users retrieved successfully", users),
        res
      );
    } catch (error) {
      logger.error(error);
      return handleServiceResponse(
        ServiceResponse.failure(
          "Error retrieving users",
          null,
          StatusCodes.INTERNAL_SERVER_ERROR
        ),
        res
      );
    }
  };
}

export const usersController = new UsersController();
