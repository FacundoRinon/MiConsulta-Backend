import { Request, Response } from "express";
import { DataService } from "../frameworks/data-services";
import {
  RecurrenceGroupSchema,
  RecurrenceGroupUpdateSchema,
} from "../core/schemas/recurrenceGroup.schema";

const dataService = new DataService();

export const recurrenceGroupController = {
  async getAllRecurrenceGroups(req: Request, res: Response) {
    try {
      const recurrenceGroups = await dataService.recurrenceGroupss.getAll({});
      res.json(recurrenceGroups);
    } catch (error) {
      console.error("Error fetching recurrence groups:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  async getRecurrenceGroupById(req: Request, res: Response) {
    try {
      const recurrenceGroup = await dataService.recurrenceGroupss.get(
        req.params.id
      );
      res.json(recurrenceGroup);
    } catch (error) {
      console.error("Error fetching recurrence group:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  async createRecurrenceGroup(req: Request, res: Response) {
    try {
      const parsedRecurrenceGroup = RecurrenceGroupSchema.parse(req.body);
      const newRecurrenceGroup = await dataService.recurrenceGroupss.create(
        parsedRecurrenceGroup
      );
      res.status(201).json(newRecurrenceGroup);
    } catch (error) {
      console.error("Error creating recurrence group:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  async updateRecurrenceGroup(req: Request, res: Response) {
    try {
      const parsedData = RecurrenceGroupUpdateSchema.parse(req.body);
      // parsedData.updated_at = new Date();
      const updatedRecurrenceGroup = dataService.recurrenceGroupss.update(
        req.params.id,
        parsedData
      );
      res.status(201).json(updatedRecurrenceGroup);
    } catch (error) {
      console.error("Error updating recurrence group: ", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  async deleteRecurrenceGroup(req: Request, res: Response) {
    try {
      // Aca tendria que validar que el usuario tiene token o validacion de ser el usuario a eliminar (Solo el mismo usuario se puede eliminar)
      // Tambien se puede fijar si es un admin (El admin va a poder eliminar usuarios aunque no sea el dueño del mismo).
      const deletedRecurrenceGroup = dataService.recurrenceGroupss.delete(
        req.params.id
      );
      res.status(201).json(deletedRecurrenceGroup);
    } catch (error) {
      console.error("Error deleting recurrence group: ", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },
};
