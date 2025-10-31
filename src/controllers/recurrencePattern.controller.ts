import { Request, Response } from "express";
import { DataService } from "../frameworks/data-services";
import {
  RecurrencePatternSchema,
  RecurrencePatternUpdateSchema,
} from "../core/schemas/recurrencePattern.schema";

const dataService = new DataService();

export const recurrencePatternController = {
  async getAllRecurrencePatterns(req: Request, res: Response) {
    try {
      const recurrencePatterns = await dataService.recurrencePatternss.getAll(
        {}
      );
      res.json(recurrencePatterns);
    } catch (error) {
      console.error("Error fetching recurrence patterns:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  async getRecurrencePatternById(req: Request, res: Response) {
    try {
      const recurrencePattern = await dataService.recurrencePatternss.get(
        req.params.id
      );
      res.json(recurrencePattern);
    } catch (error) {
      console.error("Error fetching recurrence pattern:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  async createRecurrencePattern(req: Request, res: Response) {
    try {
      const parsedRecurrencePattern = RecurrencePatternSchema.parse(req.body);
      const newRecurrencePattern = await dataService.recurrencePatternss.create(
        parsedRecurrencePattern
      );
      res.status(201).json(newRecurrencePattern);
    } catch (error) {
      console.error("Error creating recurrence pattern:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  async updateRecurrencePattern(req: Request, res: Response) {
    try {
      const parsedData = RecurrencePatternUpdateSchema.parse(req.body);
      // parsedData.updated_at = new Date();
      const updatedRecurrencePattern = dataService.recurrencePatternss.update(
        req.params.id,
        parsedData
      );
      res.status(201).json(updatedRecurrencePattern);
    } catch (error) {
      console.error("Error updating recurrence pattern: ", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  async deleteRecurrencePattern(req: Request, res: Response) {
    try {
      // Aca tendria que validar que el usuario tiene token o validacion de ser el usuario a eliminar (Solo el mismo usuario se puede eliminar)
      // Tambien se puede fijar si es un admin (El admin va a poder eliminar usuarios aunque no sea el dueño del mismo).
      const deletedRecurrencePattern = dataService.recurrencePatternss.delete(
        req.params.id
      );
      res.status(201).json(deletedRecurrencePattern);
    } catch (error) {
      console.error("Error deleting recurrence pattern: ", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },
};
