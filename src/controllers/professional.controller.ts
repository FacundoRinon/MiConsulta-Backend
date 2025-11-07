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
          consult: false,
          locations: false,
          professional_branch: true,
          countries: true,
          professional_states: true,
          professions: true,
          availabilities: false,
          password: false,
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
        // password:false,
        availabilities: true,
        consult: true,
        locations: true,
        professional_branch: true,
        countries: true,
        professional_states: true,
        professions: true,
        document_type: true,
      });

      if (!professional) {
        return res.status(400).json({
          error: "El profesional no existe en nuestra base de datos.",
        });
      }
      res.json(professional);
    } catch (error) {
      console.error("Error fetching professional:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  async createProfessional(req: Request, res: Response) {
    try {
      const existingEmailArray = await dataService.professionalss.getAll({
        email: req.body.email,
      });
      const existingEmail = existingEmailArray[0];
      if (existingEmail) {
        return res.status(400).json({
          error: "El email ya esta registrado.",
        });
      }

      const parsedProfessional = await ProfessionalSchema.parseAsync(req.body);
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
      const existingProfessional = await dataService.professionalss.get(
        req.params.id
      );
      if (!existingProfessional) {
        return res.status(400).json({
          error: "El profesional no existe en nuestra base de datos.",
        });
      }
      const parsedData = ProfessionalUpdateSchema.parse(req.body);
      parsedData.updated_at = new Date();
      const updatedProfessional = await dataService.professionalss.update(
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
      const existingProfessional = await dataService.professionalss.get(
        req.params.id
      );

      if (!existingProfessional) {
        return res.status(400).json({
          error: "El profesional no existe en nuestra base de datos.",
        });
      }

      const deletedProfessional = await dataService.professionalss.delete(
        req.params.id
      );
      res.status(201).json(deletedProfessional);
    } catch (error) {
      console.error("Error deleting professional: ", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },
};
