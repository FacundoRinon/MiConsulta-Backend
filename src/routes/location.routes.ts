import { Router } from "express";
import { locationsController } from "../controllers/locations.controller";

export const locationRouter = Router();

locationRouter.get("/", locationsController.getAllLocations);
locationRouter.get("/:id", locationsController.getLocationsById);
locationRouter.post("/", locationsController.createLocation);
locationRouter.patch("/:id", locationsController.updateLocation);
locationRouter.delete("/:id", locationsController.deleteLocation);
