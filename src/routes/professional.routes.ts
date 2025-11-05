import { Router } from "express";
import { professionalController } from "../controllers/professional.controller";
import { authMiddleware } from "../middlewares/AuthMiddleware/auth";
import { authorize } from "../middlewares/AuthMiddleware/authorize";

export const professionalRouter = Router();

// CRUD restrictions

// Los Read son solo accesibles si se tiene un token del Back.
professionalRouter.get(
  "/",
  authMiddleware,
  professionalController.getAllProfessionals
);
professionalRouter.get(
  "/:id",
  authMiddleware,
  professionalController.getProfessionalById
);

// Create no necesita un token (eventualmente va a requerir una aprovacion)
professionalRouter.post("/", professionalController.createProfessional);

// Update y Delete son solo accesibles si se tiene un token de admin o se tiene el token del profesional en cuestion.
professionalRouter.patch(
  "/:id",
  authMiddleware,
  authorize(["admin"], true),
  professionalController.updateProfessional
);
professionalRouter.delete(
  "/:id",
  authMiddleware,
  authorize(["admin"], true),
  professionalController.deleteProfessional
);
