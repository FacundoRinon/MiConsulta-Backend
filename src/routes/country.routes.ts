import { Router } from "express";
import { countryController } from "../controllers/country.controller";

export const countryRouter = Router();

countryRouter.get("/", countryController.getAllCountries);
countryRouter.get("/:id", countryController.getCountryById);
countryRouter.post("/", countryController.createCountry);
countryRouter.patch("/:id", countryController.updateCountry);
countryRouter.delete("/:id", countryController.deleteCountry);
