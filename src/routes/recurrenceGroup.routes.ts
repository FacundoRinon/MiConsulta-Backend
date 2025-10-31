import { Router } from "express";
import { recurrenceGroupController } from "../controllers/recurrenceGroup.controller";

export const recurrenceGroupRouter = Router();

recurrenceGroupRouter.get(
  "/",
  recurrenceGroupController.getAllRecurrenceGroups
);
recurrenceGroupRouter.get(
  "/:id",
  recurrenceGroupController.getRecurrenceGroupById
);
recurrenceGroupRouter.post(
  "/",
  recurrenceGroupController.createRecurrenceGroup
);
recurrenceGroupRouter.patch(
  "/:id",
  recurrenceGroupController.updateRecurrenceGroup
);
recurrenceGroupRouter.delete(
  "/:id",
  recurrenceGroupController.deleteRecurrenceGroup
);
