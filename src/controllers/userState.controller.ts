import { Request, Response } from "express";
import { DataService } from "../frameworks/data-services";
import { StateSchema, StateUpdateSchema } from "../core/schemas/state.schema";

const dataService = new DataService();

export const userStateController = {
  async getAllUserStates(req: Request, res: Response) {
    try {
      const userStates = await dataService.userStatess.getAll({});
      res.json(userStates);
    } catch (error) {
      console.error("Error fetching user states:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  async getUserStateById(req: Request, res: Response) {
    try {
      const existingResource = await dataService.userStatess.get(req.params.id);

      if (!existingResource) {
        return res.status(400).json({
          error: "El user state no existe en nuestra base de datos.",
        });
      }

      const userState = await dataService.userStatess.get(req.params.id);
      res.json(userState);
    } catch (error) {
      console.error("Error fetching user state:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  async createUserState(req: Request, res: Response) {
    try {
      const parsedUserState = StateSchema.parse(req.body);
      const newUserState = await dataService.userStatess.create(
        parsedUserState
      );
      res.status(201).json(newUserState);
    } catch (error) {
      console.error("Error creating user state:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  async updateUserState(req: Request, res: Response) {
    try {
      const existingResource = await dataService.userStatess.get(req.params.id);

      if (!existingResource) {
        return res.status(400).json({
          error: "El user state no existe en nuestra base de datos.",
        });
      }

      const parsedData = StateUpdateSchema.parse(req.body);

      const updatedUserState = await dataService.userStatess.update(
        req.params.id,
        parsedData
      );
      res.status(201).json(updatedUserState);
    } catch (error) {
      console.error("Error updating user state: ", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  async deleteUserState(req: Request, res: Response) {
    try {
      const existingResource = await dataService.userStatess.get(req.params.id);

      if (!existingResource) {
        return res.status(400).json({
          error: "El estado de usuario no existe en nuestra base de datos.",
        });
      }

      const deletedUserState = await dataService.userStatess.delete(
        req.params.id
      );
      res.status(201).json(deletedUserState);
    } catch (error) {
      console.error("Error deleting user state: ", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },
};
