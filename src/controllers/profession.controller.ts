import { Request, Response } from "express";
import { DataService } from "../frameworks/data-services";
import { ProfessionSchema } from "../core/schemas/profession.schema";

const dataService = new DataService();

export const professionController = {
  async getAllProfessions(req: Request, res: Response) {
    try {
      const professions = await dataService.professionss.getAll({});
      res.json(professions);
    } catch (error) {
      console.error("Error fetching professions:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  async getProfessionById(req: Request, res: Response) {
    try {
      const profession = await dataService.professionss.get(req.params.id);

      if (!profession) {
        return res.status(400).json({
          error: "La profesion no existe en nuestra base de datos.",
        });
      }

      res.json(profession);
    } catch (error) {
      console.error("Error fetching profession :", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  async createProfession(req: Request, res: Response) {
    try {
      const parsedProfession = ProfessionSchema.parse(req.body);
      const newProfession = await dataService.professionss.create(
        parsedProfession
      );
      res.status(201).json(newProfession);
    } catch (error) {
      console.error("Error creating profession:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  async updateProfession(req: Request, res: Response) {
    try {
      const existingResource = await dataService.professionss.get(
        req.params.id
      );

      if (!existingResource) {
        return res.status(400).json({
          error: "La profesion no existe en nuestra base de datos.",
        });
      }
      const parsedData = ProfessionSchema.parse(req.body);
      // parsedData.updated_at = new Date();
      const updatedProfession = await dataService.professionss.update(
        req.params.id,
        parsedData
      );
      res.status(201).json(updatedProfession);
    } catch (error) {
      console.error("Error updating profession: ", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  async deleteProfession(req: Request, res: Response) {
    try {
      const existingResource = await dataService.professionss.get(
        req.params.id
      );

      if (!existingResource) {
        return res.status(400).json({
          error: "La profesion no existe en nuestra base de datos.",
        });
      }
      const deletedProfession = await dataService.professionss.delete(
        req.params.id
      );

      res.status(201).json(deletedProfession);
    } catch (error) {
      console.error("Error deleting profession: ", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },
};
