import { Router } from "express";
import { branchController } from "../controllers/branch.controller";

export const branchRouter = Router();

branchRouter.get("/", branchController.getAllBranches);
branchRouter.get("/:id", branchController.getBranchById);
branchRouter.post("/", branchController.createBranch);
branchRouter.patch("/:id", branchController.updateBranch);
branchRouter.delete("/:id", branchController.deleteBranch);
