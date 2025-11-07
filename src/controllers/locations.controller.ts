import { Request, Response } from "express";
import { DataService } from "../frameworks/data-services";
import {
  LocationsSchema,
  LocationsUpdateSchema,
} from "../core/schemas/location.schema";

const dataService = new DataService();

export const locationsController = {
  async getAllLocations(req: Request, res: Response) {
    try {
      const locations = await dataService.locationss.getAll({});
      res.json(locations);
    } catch (error) {
      console.error("Error fetching locations:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  async getLocationsById(req: Request, res: Response) {
    try {
      const location = await dataService.locationss.get(req.params.id);

      if (!location) {
        return res.status(400).json({
          error: "La ubicacion no existe en nuestra base de datos.",
        });
      }

      res.json(location);
    } catch (error) {
      console.error("Error fetching location:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  async createLocation(req: Request, res: Response) {
    try {
      const professionalId = req.data.id;
      const parsedLocation = LocationsSchema.parse({
        ...req.body,
        professional_id: professionalId,
      });
      const newLocation = await dataService.locationss.create(parsedLocation);
      res.status(201).json(newLocation);
    } catch (error) {
      console.error("Error creating location:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  async updateLocation(req: Request, res: Response) {
    try {
      const existingResource = await dataService.locationss.get(req.params.id);

      if (!existingResource) {
        return res.status(400).json({
          error: "La ubicacion no existe en nuestra base de datos.",
        });
      }

      const parsedData = LocationsUpdateSchema.parse(req.body);
      const updatedLocation = await dataService.locationss.update(
        req.params.id,
        parsedData
      );
      res.status(201).json(updatedLocation);
    } catch (error) {
      console.error("Error updating location: ", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  async deleteLocation(req: Request, res: Response) {
    try {
      const existingResource = await dataService.locationss.get(req.params.id);

      if (!existingResource) {
        return res.status(400).json({
          error: "La ubicacion no existe en nuestra base de datos.",
        });
      }
      const deletedLocation = await dataService.locationss.delete(
        req.params.id
      );
      res.status(201).json(deletedLocation);
    } catch (error) {
      console.error("Error deleting location: ", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },
};
