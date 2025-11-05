import { Router } from "express";
import { availabilityStateController } from "../controllers/availabilityState.controller";
import { authMiddleware } from "../middlewares/AuthMiddleware/auth";
import { authorize } from "../middlewares/AuthMiddleware/authorize";

export const availabilityStateRouter = Router();

// CRUD restrictions
// Read son accesibles para todos los que tengan un token.
availabilityStateRouter.get(
  "/",
  availabilityStateController.getAllAvailabilityStates
);
availabilityStateRouter.get(
  "/:id",
  availabilityStateController.getAvailabilityStateById
);

// Create, Update y Delete son solo accesibles para los admins
availabilityStateRouter.post(
  "/",
  authMiddleware,
  authorize(["admin"]),
  availabilityStateController.createAvailabilityState
);
availabilityStateRouter.patch(
  "/:id",
  authMiddleware,
  authorize(["admin"]),
  availabilityStateController.updateAvailabilityState
);
availabilityStateRouter.delete(
  "/:id",
  authMiddleware,
  authorize(["admin"]),
  availabilityStateController.deleteAvailabilityState
);
