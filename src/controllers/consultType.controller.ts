import { Request, Response } from "express";
import { DataService } from "../frameworks/data-services";
import {
  ConsultTypeSchema,
  ConsultTypeUpdateSchema,
} from "../core/schemas/consultType.schema";

const dataService = new DataService();

export const consultTypeController = {
  async getAllConsultTypes(req: Request, res: Response) {
    try {
      const consult_types = await dataService.consultTypess.getAll({});
      res.json(consult_types);
    } catch (error) {
      console.error("Error fetching consult types:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  async getConsultTypeById(req: Request, res: Response) {
    try {
      const consultType = await dataService.consultTypess.get(req.params.id);
      res.json(consultType);
    } catch (error) {
      console.error("Error fetching consult type:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  async createConsultType(req: Request, res: Response) {
    try {
      const parsedConsultType = ConsultTypeSchema.parse(req.body);
      const newConsultType = await dataService.consultTypess.create(
        parsedConsultType
      );
      res.status(201).json(newConsultType);
    } catch (error) {
      console.error("Error creating consult type:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  async updateConsultType(req: Request, res: Response) {
    try {
      const parsedData = ConsultTypeUpdateSchema.parse(req.body);
      // parsedData.updated_at = new Date();
      const updatedConsultType = dataService.consultTypess.update(
        req.params.id,
        parsedData
      );
      res.status(201).json(updatedConsultType);
    } catch (error) {
      console.error("Error updating consult type: ", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  async deleteConsultType(req: Request, res: Response) {
    try {
      // Aca tendria que validar que el usuario tiene token o validacion de ser el usuario a eliminar (Solo el mismo usuario se puede eliminar)
      // Tambien se puede fijar si es un admin (El admin va a poder eliminar usuarios aunque no sea el dueño del mismo).
      const deletedConsultType = dataService.consultTypess.delete(
        req.params.id
      );
      res.status(201).json(deletedConsultType);
    } catch (error) {
      console.error("Error deleting consult type: ", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },
};
