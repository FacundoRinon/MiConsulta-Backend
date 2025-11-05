import { Router } from "express";
import { userController } from "../controllers/user.controller";
import { authMiddleware } from "../middlewares/AuthMiddleware/auth";
import { authorize } from "../middlewares/AuthMiddleware/authorize";

export const userRouter = Router();

// Con estar logueado es suficiente. Read
userRouter.get("/", authMiddleware, userController.getAllUsers);
userRouter.get("/:id", authMiddleware, userController.getUserById);

// No usar el middleware porque es el Login. Create
userRouter.post("/", userController.createUser);

// Usan el authorize para que solo lo puedan updetear o borrar, un admin o el mismo usuario. Update, Delete.
userRouter.patch(
  "/:id",
  authMiddleware,
  authorize(["admin"], true),
  userController.updateUser
);
userRouter.delete("/:id", authMiddleware, userController.deleteUser);
