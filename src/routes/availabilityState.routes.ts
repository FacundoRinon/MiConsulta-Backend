import { Router } from "express";
import { availabilityStateController } from "../controllers/availabilityState.controller";

export const availabilityStateRouter = Router();

availabilityStateRouter.get(
  "/",
  availabilityStateController.getAllAvailabilityStates
);
availabilityStateRouter.get(
  "/:id",
  availabilityStateController.getAvailabilityStateById
);
availabilityStateRouter.post(
  "/",
  availabilityStateController.createAvailabilityState
);
availabilityStateRouter.patch(
  "/:id",
  availabilityStateController.updateAvailabilityState
);
availabilityStateRouter.delete(
  "/:id",
  availabilityStateController.deleteAvailabilityState
);
