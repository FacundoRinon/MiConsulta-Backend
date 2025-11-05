import { Request, Response } from "express";
import { DataService } from "../frameworks/data-services";
import { StateSchema, StateUpdateSchema } from "../core/schemas/state.schema";

const dataService = new DataService();

export const availabilityStateController = {
  async getAllAvailabilityStates(req: Request, res: Response) {
    try {
      const availability_states = await dataService.availabilityStatess.getAll(
        {}
      );
      res.json(availability_states);
    } catch (error) {
      console.error("Error fetching availability states:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  async getAvailabilityStateById(req: Request, res: Response) {
    try {
      const availabilityState = await dataService.availabilityStatess.get(
        req.params.id
      );
      res.json(availabilityState);
    } catch (error) {
      console.error("Error fetching availability state:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  async createAvailabilityState(req: Request, res: Response) {
    try {
      const parsedAvailabilityState = StateSchema.parse(req.body);
      const newAvailabilityState = await dataService.availabilityStatess.create(
        parsedAvailabilityState
      );
      res.status(201).json(newAvailabilityState);
    } catch (error) {
      console.error("Error creating availability state:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  async updateAvailabilityState(req: Request, res: Response) {
    try {
      const parsedData = StateUpdateSchema.parse(req.body);
      // parsedData.updated_at = new Date();
      const updatedAvailabilityState =
        await dataService.availabilityStatess.update(req.params.id, parsedData);
      res.status(201).json(updatedAvailabilityState);
    } catch (error) {
      console.error("Error updating availability state: ", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  async deleteAvailabilityState(req: Request, res: Response) {
    try {
      // Aca tendria que validar que el usuario tiene token o validacion de ser el usuario a eliminar (Solo el mismo usuario se puede eliminar)
      // Tambien se puede fijar si es un admin (El admin va a poder eliminar usuarios aunque no sea el dueño del mismo).
      const deletedAvailabilityState =
        await dataService.availabilityStatess.delete(req.params.id);
      res.status(201).json(deletedAvailabilityState);
    } catch (error) {
      console.error("Error deleting availability state: ", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },
};
