import { Router } from "express";
import { userStateController } from "../controllers/userState.controller";
import { authMiddleware } from "../middlewares/AuthMiddleware/auth";
import { authorize } from "../middlewares/AuthMiddleware/authorize";

export const userStateRouter = Router();

// Los Read son accesibles con solo contar con un token
userStateRouter.get("/", authMiddleware, userStateController.getAllUserStates);
userStateRouter.get(
  "/:id",
  authMiddleware,
  userStateController.getUserStateById
);

// Create, Update y Delete, solo los puede hacer un admin
userStateRouter.post(
  "/",
  authMiddleware,
  authorize(["admin"]),
  userStateController.createUserState
);
userStateRouter.patch(
  "/:id",
  authMiddleware,
  authorize(["admin"]),
  userStateController.updateUserState
);
userStateRouter.delete(
  "/:id",
  authMiddleware,
  authorize(["admin"]),
  userStateController.deleteUserState
);
