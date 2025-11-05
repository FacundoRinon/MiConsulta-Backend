import { Router } from "express";
import { authController } from "../controllers/auth.controller";

export const authRouter = Router();

authRouter.post("/userToken", authController.userLogin);
authRouter.post("/professionalToken", authController.professionalLogin);
