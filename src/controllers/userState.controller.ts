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
      const parsedData = StateUpdateSchema.parse(req.body);
      // parsedData.updated_at = new Date();
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
      // Aca tendria que validar que el usuario tiene token o validacion de ser el usuario a eliminar (Solo el mismo usuario se puede eliminar)
      // Tambien se puede fijar si es un admin (El admin va a poder eliminar usuarios aunque no sea el dueño del mismo).
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
