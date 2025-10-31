import { Router } from "express";
import { recurrencePatternController } from "../controllers/recurrencePattern.controller";

export const recurrencePatternRouter = Router();

recurrencePatternRouter.get(
  "/",
  recurrencePatternController.getAllRecurrencePatterns
);
recurrencePatternRouter.get(
  "/:id",
  recurrencePatternController.getRecurrencePatternById
);
recurrencePatternRouter.post(
  "/",
  recurrencePatternController.createRecurrencePattern
);
recurrencePatternRouter.patch(
  "/:id",
  recurrencePatternController.updateRecurrencePattern
);
recurrencePatternRouter.delete(
  "/:id",
  recurrencePatternController.deleteRecurrencePattern
);
