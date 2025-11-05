import { Router } from "express";
import { availabilityController } from "../controllers/availability.controller";
import { authMiddleware } from "../middlewares/AuthMiddleware/auth";
import { authorize } from "../middlewares/AuthMiddleware/authorize";
import { authorizeOwnerOrAdmin } from "../middlewares/AuthMiddleware/authorizeOwnerOrAdmin";

export const availabilityRouter = Router();

//CRUD restrictions
// Read solo se necesita un token
availabilityRouter.get(
  "/",
  authMiddleware,
  availabilityController.getAllAvailabilities
);
availabilityRouter.get(
  "/:id",
  authMiddleware,
  availabilityController.getAvailabilityById
);

// Create solo accesible para los tokens de professionals
availabilityRouter.post(
  "/",
  authMiddleware,
  authorize(["professional"]),
  availabilityController.createAvailability
);

// Update y Delete son solo accesibles para los admins o los dueños de la availability
availabilityRouter.patch(
  "/:id",
  authMiddleware,
  authorizeOwnerOrAdmin("availabilitiess", "professional_id"),
  availabilityController.updateAvailability
);
availabilityRouter.delete(
  "/:id",
  authMiddleware,
  authorizeOwnerOrAdmin("availabilitiess", "professional_id"),
  availabilityController.deleteAvailability
);
