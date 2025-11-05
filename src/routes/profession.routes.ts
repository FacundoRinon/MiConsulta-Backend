import { Router } from "express";
import { professionController } from "../controllers/profession.controller";
import { authMiddleware } from "../middlewares/AuthMiddleware/auth";
import { authorize } from "../middlewares/AuthMiddleware/authorize";

export const professionRouter = Router();

// CRUD restrictions

// Los Read son accesibles siempre que se tenga un token del Back.
professionRouter.get(
  "/",
  authMiddleware,
  professionController.getAllProfessions
);
professionRouter.get(
  "/:id",
  authMiddleware,
  professionController.getProfessionById
);

// Create, Update y Delete son solo accesibles por un admin.
professionRouter.post(
  "/",
  authMiddleware,
  authorize(["admin"]),
  professionController.createProfession
);
professionRouter.patch(
  "/:id",
  authMiddleware,
  authorize(["admin"]),
  professionController.updateProfession
);
professionRouter.delete(
  "/:id",
  authMiddleware,
  authorize(["admin"]),
  professionController.deleteProfession
);
