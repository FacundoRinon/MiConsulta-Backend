import { Router } from "express";
import { recurrenceGroupController } from "../controllers/recurrenceGroup.controller";
import { authMiddleware } from "../middlewares/AuthMiddleware/auth";
import { authorize } from "../middlewares/AuthMiddleware/authorize";

export const recurrenceGroupRouter = Router();

recurrenceGroupRouter.get(
  "/",
  authMiddleware,
  recurrenceGroupController.getAllRecurrenceGroups
);
recurrenceGroupRouter.get(
  "/:id",
  authMiddleware,
  recurrenceGroupController.getRecurrenceGroupById
);
recurrenceGroupRouter.post(
  "/",
  authMiddleware,
  authorize(["admin"]),
  recurrenceGroupController.createRecurrenceGroup
);
recurrenceGroupRouter.patch(
  "/:id",
  authMiddleware,
  authorize(["admin"]),
  recurrenceGroupController.updateRecurrenceGroup
);
recurrenceGroupRouter.delete(
  "/:id",
  authMiddleware,
  authorize(["admin"]),
  recurrenceGroupController.deleteRecurrenceGroup
);
