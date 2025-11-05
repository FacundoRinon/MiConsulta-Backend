import { Router } from "express";
import { modalityController } from "../controllers/modality.controller";
import { authMiddleware } from "../middlewares/AuthMiddleware/auth";
import { authorize } from "../middlewares/AuthMiddleware/authorize";

export const modalityRouter = Router();

// CRUD restrictions
modalityRouter.get("/", authMiddleware, modalityController.getAllModalities);
modalityRouter.get("/:id", authMiddleware, modalityController.getModalityById);

// Create, Delete y Update solo para amins
modalityRouter.post(
  "/",
  authMiddleware,
  authorize(["admin"]),
  modalityController.createModality
);
modalityRouter.patch(
  "/:id",
  authMiddleware,
  authorize(["admin"]),
  modalityController.updateModality
);
modalityRouter.delete(
  "/:id",
  authMiddleware,
  authorize(["admin"]),
  modalityController.deleteModality
);
