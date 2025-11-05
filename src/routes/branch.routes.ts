import { Router } from "express";
import { branchController } from "../controllers/branch.controller";
import { authMiddleware } from "../middlewares/AuthMiddleware/auth";
import { authorize } from "../middlewares/AuthMiddleware/authorize";

export const branchRouter = Router();

// CRUD restrictions
// Son accesibles al tener un token del back
branchRouter.get("/", authMiddleware, branchController.getAllBranches);
branchRouter.get("/:id", authMiddleware, branchController.getBranchById);

// Create, Update y Delete son solo accesibles por los admins
branchRouter.post(
  "/",
  authMiddleware,
  authorize(["admin"]),
  branchController.createBranch
);
branchRouter.patch(
  "/:id",
  authMiddleware,
  authorize(["admin"]),
  branchController.updateBranch
);
branchRouter.delete(
  "/:id",
  authMiddleware,
  authorize(["admin"]),
  branchController.deleteBranch
);
