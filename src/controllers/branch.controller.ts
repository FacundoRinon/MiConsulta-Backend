import { Request, Response } from "express";
import { DataService } from "../frameworks/data-services";
import {
  BranchSchema,
  BranchUpdateSchema,
} from "../core/schemas/branch.schema";

const dataService = new DataService();

export const branchController = {
  async getAllBranches(req: Request, res: Response) {
    try {
      const branches = await dataService.branchess.getAll(
        {},
        {
          professions: true,
        }
      );
      res.json(branches);
    } catch (error) {
      console.error("Error fetching branches:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  async getBranchById(req: Request, res: Response) {
    try {
      const branch = await dataService.branchess.get(req.params.id, {
        professions: true,
      });
      res.json(branch);
    } catch (error) {
      console.error("Error fetching branch:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  async createBranch(req: Request, res: Response) {
    try {
      const parsedBranch = BranchSchema.parse(req.body);
      const newBranch = await dataService.branchess.create(parsedBranch);
      res.status(201).json(newBranch);
    } catch (error) {
      console.error("Error creating branch:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  async updateBranch(req: Request, res: Response) {
    try {
      const parsedData = BranchUpdateSchema.parse(req.body);
      const updatedBranch = await dataService.branchess.update(
        req.params.id,
        parsedData
      );
      res.status(201).json(updatedBranch);
    } catch (error) {
      console.error("Error updating branch: ", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  async deleteBranch(req: Request, res: Response) {
    try {
      // Aca tendria que validar que el usuario tiene token o validacion de ser el usuario a eliminar (Solo el mismo usuario se puede eliminar)
      // Tambien se puede fijar si es un admin (El admin va a poder eliminar usuarios aunque no sea el dueño del mismo).
      const deletedBranch = await dataService.branchess.delete(req.params.id);
      res.status(201).json(deletedBranch);
    } catch (error) {
      console.error("Error deleting branch: ", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },
};
