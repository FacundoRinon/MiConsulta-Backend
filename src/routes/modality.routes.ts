import { Router } from "express";
import { modalityController } from "../controllers/modality.controller";

export const modalityRouter = Router();

modalityRouter.get("/", modalityController.getAllModalities);
modalityRouter.get("/:id", modalityController.getModalityById);
modalityRouter.post("/", modalityController.createModality);
modalityRouter.patch("/:id", modalityController.updateModality);
modalityRouter.delete("/:id", modalityController.deleteModality);
