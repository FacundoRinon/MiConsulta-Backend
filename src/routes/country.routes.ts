import { Router } from "express";
import { countryController } from "../controllers/country.controller";
import { authMiddleware } from "../middlewares/AuthMiddleware/auth";
import { authorize } from "../middlewares/AuthMiddleware/authorize";

export const countryRouter = Router();

// CRUD restrictions
// Read son accesibles teniendo un Token del Back.
countryRouter.get("/", authMiddleware, countryController.getAllCountries);
countryRouter.get("/:id", authMiddleware, countryController.getCountryById);

// Create, Update y Delete son solo accesibles por un admin
countryRouter.post(
  "/",
  authMiddleware,
  authorize(["admin"]),
  countryController.createCountry
);
countryRouter.patch(
  "/:id",
  authMiddleware,
  authorize(["admin"]),
  countryController.updateCountry
);
countryRouter.delete(
  "/:id",
  authMiddleware,
  authorize(["admin"]),
  countryController.deleteCountry
);
