import { Request, Response } from "express";
import { DataService } from "../frameworks/data-services";
import {
  ConsultSchema,
  ConsultUpdateSchema,
} from "../core/schemas/consult.schema";

const dataService = new DataService();

export const consultController = {
  async getAllConsults(req: Request, res: Response) {
    try {
      const consults = await dataService.consultss.getAll(
        {},
        {
          availabilities: true,
          modalities: true,
          professionals: true,
          recurrence_group: true,
          recurrence_pattern: true,
          consult_type: true,
          users: true,
        }
      );
      res.json(consults);
    } catch (error) {
      console.error("Error fetching consults:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  async getConsultById(req: Request, res: Response) {
    try {
      const consult = await dataService.consultss.get(req.params.id, {
        availabilities: true,
        modalities: true,
        professionals: true,
        recurrence_group: true,
        recurrence_pattern: true,
        consult_type: true,
        users: true,
      });

      if (!consult) {
        return res.status(400).json({
          error: "La consulta no existe en nuestra base de datos.",
        });
      }
      res.json(consult);
    } catch (error) {
      console.error("Error fetching consult:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  async createConsult(req: Request, res: Response) {
    try {
      // Extraer el professional_id del token
      const professionalId = req.data.id;
      const parsedConsult = ConsultSchema.parse({
        ...req.body,
        professional_id: professionalId,
      });
      const newConsult = await dataService.consultss.create(parsedConsult);
      res.status(201).json(newConsult);
    } catch (error) {
      console.error("Error creating consult:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  async updateConsult(req: Request, res: Response) {
    try {
      const existingResource = await dataService.consultss.get(req.params.id);

      if (!existingResource) {
        return res.status(400).json({
          error: "La consulta no existe en nuestra base de datos.",
        });
      }

      const parsedData = ConsultUpdateSchema.parse(req.body);
      const updatedConsult = await dataService.consultss.update(
        req.params.id,
        parsedData
      );
      res.status(201).json(updatedConsult);
    } catch (error) {
      console.error("Error updating consult: ", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  async deleteConsult(req: Request, res: Response) {
    try {
      const existingResource = await dataService.consultss.get(req.params.id);

      if (!existingResource) {
        return res.status(400).json({
          error: "La consulta no existe en nuestra base de datos.",
        });
      }
      const deletedConsult = await dataService.consultss.delete(req.params.id);
      res.status(201).json(deletedConsult);
    } catch (error) {
      console.error("Error deleting consult: ", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },
};
