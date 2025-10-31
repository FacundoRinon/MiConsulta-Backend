import { Router } from "express";
import { availabilityController } from "../controllers/availability.controller";

export const availabilityRouter = Router();

availabilityRouter.get("/", availabilityController.getAllAvailabilities);
availabilityRouter.get("/:id", availabilityController.getAvailabilityById);
availabilityRouter.post("/", availabilityController.createAvailability);
availabilityRouter.patch("/:id", availabilityController.updateAvailability);
availabilityRouter.delete("/:id", availabilityController.deleteAvailability);
