import { Router } from "express";
import { professionController } from "../controllers/profession.controller";

export const professionRouter = Router();

professionRouter.get("/", professionController.getAllProfessions);
professionRouter.get("/:id", professionController.getProfessionById);
professionRouter.post("/", professionController.createProfession);
professionRouter.patch("/:id", professionController.updateProfession);
professionRouter.delete("/:id", professionController.deleteProfession);
