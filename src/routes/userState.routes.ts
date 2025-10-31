import { Router } from "express";
import { userStateController } from "../controllers/userState.controller";

export const userStateRouter = Router();

userStateRouter.get("/", userStateController.getAllUserStates);
userStateRouter.get("/:id", userStateController.getUserStateById);
userStateRouter.post("/", userStateController.createUserState);
userStateRouter.patch("/:id", userStateController.updateUserState);
userStateRouter.delete("/:id", userStateController.deleteUserState);
