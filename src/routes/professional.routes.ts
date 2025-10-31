import { Router } from "express";
import { professionalController } from "../controllers/professional.controller";

export const professionalRouter = Router();

professionalRouter.get("/", professionalController.getAllProfessionals);
professionalRouter.get("/:id", professionalController.getProfessionalById);
professionalRouter.post("/", professionalController.createProfessional);
professionalRouter.patch("/:id", professionalController.updateProfessional);
professionalRouter.delete("/:id", professionalController.deleteProfessional);
