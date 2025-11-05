import { Request, Response } from "express";
import { DataService } from "../frameworks/data-services";
import { ModalitySchema } from "../core/schemas/modality.schema";

const dataService = new DataService();

export const modalityController = {
  async getAllModalities(req: Request, res: Response) {
    try {
      const modalities = await dataService.modalitiess.getAll({});
      res.json(modalities);
    } catch (error) {
      console.error("Error fetching modalities:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  async getModalityById(req: Request, res: Response) {
    try {
      const modality = await dataService.modalitiess.get(req.params.id);
      res.json(modality);
    } catch (error) {
      console.error("Error fetching modality:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  async createModality(req: Request, res: Response) {
    try {
      const parsedModality = ModalitySchema.parse(req.body);
      const newModality = await dataService.modalitiess.create(parsedModality);
      res.status(201).json(newModality);
    } catch (error) {
      console.error("Error creating modality:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  async updateModality(req: Request, res: Response) {
    try {
      const parsedData = ModalitySchema.parse(req.body);
      const updatedModality = await dataService.modalitiess.update(
        req.params.id,
        parsedData
      );
      res.status(201).json(updatedModality);
    } catch (error) {
      console.error("Error updating modality: ", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  async deleteModality(req: Request, res: Response) {
    try {
      // Aca tendria que validar que el usuario tiene token o validacion de ser el usuario a eliminar (Solo el mismo usuario se puede eliminar)
      // Tambien se puede fijar si es un admin (El admin va a poder eliminar usuarios aunque no sea el dueño del mismo).
      const deletedModality = await dataService.modalitiess.delete(
        req.params.id
      );
      res.status(201).json(deletedModality);
    } catch (error) {
      console.error("Error deleting modality: ", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },
};
