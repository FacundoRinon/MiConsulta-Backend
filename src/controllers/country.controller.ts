import { Request, Response } from "express";
import { DataService } from "../frameworks/data-services";
import {
  CountrySchema,
  CountryUpdateSchema,
} from "../core/schemas/country.schema";

const dataService = new DataService();

export const countryController = {
  async getAllCountries(req: Request, res: Response) {
    try {
      const countries = await dataService.countriess.getAll({});
      res.json(countries);
    } catch (error) {
      console.error("Error fetching countries:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  async getCountryById(req: Request, res: Response) {
    try {
      const country = await dataService.countriess.get(req.params.id);

      if (!country) {
        return res.status(400).json({
          error: "El pais no existe en nuestra base de datos.",
        });
      }
      res.json(country);
    } catch (error) {
      console.error("Error fetching country:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  async createCountry(req: Request, res: Response) {
    try {
      const parsedCountry = CountrySchema.parse(req.body);
      const newCountry = await dataService.countriess.create(parsedCountry);
      res.status(201).json(newCountry);
    } catch (error) {
      console.error("Error creating country:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  async updateCountry(req: Request, res: Response) {
    try {
      const existingResource = await dataService.countriess.get(req.params.id);

      if (!existingResource) {
        return res.status(400).json({
          error: "El pais no existe en nuestra base de datos.",
        });
      }

      const parsedData = CountryUpdateSchema.parse(req.body);
      const updatedCountry = await dataService.countriess.update(
        req.params.id,
        parsedData
      );
      res.status(201).json(updatedCountry);
    } catch (error) {
      console.error("Error updating country: ", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  async deleteCountry(req: Request, res: Response) {
    try {
      const existingResource = await dataService.countriess.get(req.params.id);

      if (!existingResource) {
        return res.status(400).json({
          error: "El pais no existe en nuestra base de datos.",
        });
      }
      const deletedCountry = await dataService.countriess.delete(req.params.id);
      res.status(201).json(deletedCountry);
    } catch (error) {
      console.error("Error deleting country: ", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },
};
