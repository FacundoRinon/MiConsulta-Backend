import { Router } from "express";
import { locationsController } from "../controllers/locations.controller";
import { authMiddleware } from "../middlewares/AuthMiddleware/auth";
import { authorize } from "../middlewares/AuthMiddleware/authorize";
import { authorizeOwnerOrAdmin } from "../middlewares/AuthMiddleware/authorizeOwnerOrAdmin";

export const locationRouter = Router();

locationRouter.get("/", locationsController.getAllLocations);
locationRouter.get("/:id", locationsController.getLocationsById);

// Solo los professionales pueden crear una locacion para la consulta.
locationRouter.post(
  "/",
  authMiddleware,
  authorize(["professional"]),
  locationsController.createLocation
);

// Tengo que crear un middleware que permita acceder a estas rutas si el elemento a modificar o eliminar les pertenece.
locationRouter.patch(
  "/:id",
  authMiddleware,
  // por ahora este es el nuevo middleware TESTEAR BIEN
  authorizeOwnerOrAdmin("locationss", "professional_id"),
  locationsController.updateLocation
);
locationRouter.delete(
  "/:id",
  authMiddleware,
  // por ahora este es el nuevo middleware TESTEAR BIEN
  authorizeOwnerOrAdmin("locationss", "professional_id"),
  locationsController.deleteLocation
);
