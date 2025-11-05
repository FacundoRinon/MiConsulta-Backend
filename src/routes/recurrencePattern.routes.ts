import { Router } from "express";
import { recurrencePatternController } from "../controllers/recurrencePattern.controller";
import { authMiddleware } from "../middlewares/AuthMiddleware/auth";
import { authorize } from "../middlewares/AuthMiddleware/authorize";

export const recurrencePatternRouter = Router();

recurrencePatternRouter.get(
  "/",
  authMiddleware,
  recurrencePatternController.getAllRecurrencePatterns
);
recurrencePatternRouter.get(
  "/:id",
  authMiddleware,
  recurrencePatternController.getRecurrencePatternById
);
recurrencePatternRouter.post(
  "/",
  authMiddleware,
  authorize(["admin"]),
  recurrencePatternController.createRecurrencePattern
);
recurrencePatternRouter.patch(
  "/:id",
  authMiddleware,
  authorize(["admin"]),
  recurrencePatternController.updateRecurrencePattern
);
recurrencePatternRouter.delete(
  "/:id",
  authMiddleware,
  authorize(["admin"]),
  recurrencePatternController.deleteRecurrencePattern
);
