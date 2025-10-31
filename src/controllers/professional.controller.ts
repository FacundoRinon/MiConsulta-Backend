import { Request, Response } from "express";
import { DataService } from "../frameworks/data-services";
import {
  ProfessionalSchema,
  ProfessionalUpdateSchema,
} from "../core/schemas/professional.schema";

const dataService = new DataService();

export const professionalController = {
  async getAllProfessionals(req: Request, res: Response) {
    try {
      const professionals = await dataService.professionalss.getAll(
        {},
        {
          availabilities: true,
          consult: true,
          locations: true,
          professional_branch: true,
          countries: true,
          professional_states: true,
          professions: true,
          // document_type: true,
        }
      );
      res.json(professionals);
    } catch (error) {
      console.error("Error fetching professionals:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  async getProfessionalById(req: Request, res: Response) {
    try {
      const professional = await dataService.professionalss.get(req.params.id, {
        availabilities: true,
        consult: true,
        locations: true,
        professional_branch: true,
        countries: true,
        professional_states: true,
        professions: true,
        // document_type: true,
      });
      res.json(professional);
    } catch (error) {
      console.error("Error fetching professional:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  async createProfessional(req: Request, res: Response) {
    try {
      const parsedProfessional = ProfessionalSchema.parse(req.body);
      const newProfessional = await dataService.professionalss.create(
        parsedProfessional
      );
      res.status(201).json(newProfessional);
    } catch (error) {
      console.error("Error creating professional:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  async updateProfessional(req: Request, res: Response) {
    try {
      const parsedData = ProfessionalUpdateSchema.parse(req.body);
      parsedData.updated_at = new Date();
      const updatedProfessional = dataService.professionalss.update(
        req.params.id,
        parsedData
      );
      res.status(201).json(updatedProfessional);
    } catch (error) {
      console.error("Error updating professional: ", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  async deleteProfessional(req: Request, res: Response) {
    try {
      // Aca tendria que validar que el usuario tiene token o validacion de ser el usuario a eliminar (Solo el mismo usuario se puede eliminar)
      // Tambien se puede fijar si es un admin (El admin va a poder eliminar usuarios aunque no sea el dueño del mismo).
      const deletedProfessional = dataService.professionalss.delete(
        req.params.id
      );
      res.status(201).json(deletedProfessional);
    } catch (error) {
      console.error("Error deleting professional: ", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },
};
