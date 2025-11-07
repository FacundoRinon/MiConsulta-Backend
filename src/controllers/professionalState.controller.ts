import { Request, Response } from "express";
import { DataService } from "../frameworks/data-services";
import { StateSchema, StateUpdateSchema } from "../core/schemas/state.schema";

const dataService = new DataService();

export const professionalStateController = {
  async getAllProfessionalStates(req: Request, res: Response) {
    try {
      const professionalStates = await dataService.professionalStatess.getAll(
        {}
      );
      res.json(professionalStates);
    } catch (error) {
      console.error("Error fetching professional states:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  async getProfessionalStateById(req: Request, res: Response) {
    try {
      const professionalState = await dataService.professionalStatess.get(
        req.params.id
      );

      if (!professionalState) {
        return res.status(400).json({
          error:
            "El estado del profesional no existe en nuestra base de datos.",
        });
      }

      res.json(professionalState);
    } catch (error) {
      console.error("Error fetching professional state:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  async createProfessionalState(req: Request, res: Response) {
    try {
      const parsedProfessionalState = StateSchema.parse(req.body);
      const newProfessionalState = await dataService.professionalStatess.create(
        parsedProfessionalState
      );
      res.status(201).json(newProfessionalState);
    } catch (error) {
      console.error("Error creating professional state:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  async updateProfessionalState(req: Request, res: Response) {
    try {
      const existingResource = await dataService.professionalStatess.get(
        req.params.id
      );

      if (!existingResource) {
        return res.status(400).json({
          error:
            "El estado del profesional no existe en nuestra base de datos.",
        });
      }
      const parsedData = StateUpdateSchema.parse(req.body);
      // parsedData.updated_at = new Date();
      const updatedProfessionalState =
        await dataService.professionalStatess.update(req.params.id, parsedData);
      res.status(201).json(updatedProfessionalState);
    } catch (error) {
      console.error("Error updating professional state: ", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  async deleteProfessionalState(req: Request, res: Response) {
    try {
      const existingResource = await dataService.professionalStatess.get(
        req.params.id
      );

      if (!existingResource) {
        return res.status(400).json({
          error:
            "El estado del profesional no existe en nuestra base de datos.",
        });
      }
      const deletedProfessionalState =
        await dataService.professionalStatess.delete(req.params.id);

      res.status(201).json(deletedProfessionalState);
    } catch (error) {
      console.error("Error deleting professional state: ", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },
};
