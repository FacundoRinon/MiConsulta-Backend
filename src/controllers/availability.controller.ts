import { Request, Response } from "express";
import { DataService } from "../frameworks/data-services";
import {
  AvailabilitySchema,
  AvailabilityUpdateSchema,
} from "../core/schemas/availability.schema";

const dataService = new DataService();

export const availabilityController = {
  async getAllAvailabilities(req: Request, res: Response) {
    try {
      const availabilities = await dataService.availabilitiess.getAll(
        {},
        {
          modalities: true,
          professionals: true,
          availability_state: true,
          consult: true,
        }
      );
      res.json(availabilities);
    } catch (error) {
      console.error("Error fetching availabilities:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  async getAvailabilityById(req: Request, res: Response) {
    try {
      const availability = await dataService.availabilitiess.get(
        req.params.id,
        {
          modalities: true,
          professionals: true,
          availability_state: true,
          consult: true,
        }
      );
      res.json(availability);
    } catch (error) {
      console.error("Error fetching availability:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  async createAvailability(req: Request, res: Response) {
    try {
      const parsedAvailability = AvailabilitySchema.parse(req.body);
      const newAvailability = await dataService.availabilitiess.create(
        parsedAvailability
      );
      res.status(201).json(newAvailability);
    } catch (error) {
      console.error("Error creating availability:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  async updateAvailability(req: Request, res: Response) {
    try {
      const parsedData = AvailabilityUpdateSchema.parse(req.body);
      // parsedData.updated_at = new Date();
      const updatedAvailability = dataService.availabilitiess.update(
        req.params.id,
        parsedData
      );
      res.status(201).json(updatedAvailability);
    } catch (error) {
      console.error("Error updating availability: ", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  async deleteAvailability(req: Request, res: Response) {
    try {
      // Aca tendria que validar que el usuario tiene token o validacion de ser el usuario a eliminar (Solo el mismo usuario se puede eliminar)
      // Tambien se puede fijar si es un admin (El admin va a poder eliminar usuarios aunque no sea el dueño del mismo).
      const deletedAvailability = dataService.availabilitiess.delete(
        req.params.id
      );
      res.status(201).json(deletedAvailability);
    } catch (error) {
      console.error("Error deleting availability: ", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },
};
