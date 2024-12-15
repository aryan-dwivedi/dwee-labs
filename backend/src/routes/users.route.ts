import AuthMiddleware from "@/middleware/authMiddleware";
import express, { type Router } from "express";
import { validateRequest } from "@/utils/httpHandlers";
import { CreateUserSchema } from "@/models/user";
import { usersController } from "@/controllers/users.controller";

export const usersRouter: Router = express.Router();

usersRouter.post(
  "/create",
  AuthMiddleware.auth,
  validateRequest(CreateUserSchema),
  usersController.createUser
);

usersRouter.get("/", AuthMiddleware.auth, usersController.listUsers);
