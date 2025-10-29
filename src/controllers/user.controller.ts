import { Request, Response } from "express";
import { DataService } from "../frameworks/data-services";
import { UserSchema } from "../core/schemas/user.schema";

const dataService = new DataService();

export async function getAllUsers(req: Request, res: Response) {
  try {
    const users = await dataService.userss.getAll(
      {},
      {
        countries: true,
        user_states: true,
        document_type: true,
      }
    );
    res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

export async function getUserById(req: Request, res: Response) {
  try {
    console.log("ENTRA?");
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
}

export async function createUser(req: Request, res: Response) {
  try {
    const parsedUser = UserSchema.parse(req.body);
    const newUser = await dataService.userss.create(parsedUser);
    res.status(201).json(newUser);
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
