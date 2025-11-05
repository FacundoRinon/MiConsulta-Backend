import { Request, Response } from "express";
import { DataService } from "../frameworks/data-services";
import { UserSchema, UserUpdateSchema } from "../core/schemas/user.schema";

const dataService = new DataService();

export const userController = {
  async getAllUsers(req: Request, res: Response) {
    try {
      const users = await dataService.userss.getAll(
        {},
        {
          countries: true,
          user_states: true,
          document_type: true,
          password: false,
          document_number: false,
        }
      );
      res.json(users);
    } catch (error) {
      console.error("Error fetching users:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  async getUserById(req: Request, res: Response) {
    try {
      const users = await dataService.userss.get(req.params.id, {
        countries: true,
        user_states: true,
        document_type: true,
      });
      res.json(users);
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  async createUser(req: Request, res: Response) {
    try {
      const parsedUser = await UserSchema.parseAsync(req.body);
      const newUser = await dataService.userss.create(parsedUser);
      res.status(201).json(newUser);
    } catch (error) {
      console.error("Error creating user:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  async updateUser(req: Request, res: Response) {
    try {
      const parsedData = UserUpdateSchema.parse(req.body);
      parsedData.updated_at = new Date();
      const updatedUser = await dataService.userss.update(
        req.params.id,
        parsedData
      );
      res.status(201).json(updatedUser);
    } catch (error) {
      console.error("Error updating user: ", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  async deleteUser(req: Request, res: Response) {
    try {
      // Aca tendria que validar que el usuario tiene token o validacion de ser el usuario a eliminar (Solo el mismo usuario se puede eliminar)
      // Tambien se puede fijar si es un admin (El admin va a poder eliminar usuarios aunque no sea el dueño del mismo).
      const deletedUser = await dataService.userss.delete(req.params.id);
      res.status(201).json(deletedUser);
    } catch (error) {
      console.error("Error deleting user: ", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },
};
