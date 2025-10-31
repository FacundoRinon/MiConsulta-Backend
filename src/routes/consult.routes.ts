import { Router } from "express";
import { consultController } from "../controllers/consult.controller";

export const consultRouter = Router();

consultRouter.get("/", consultController.getAllConsults);
consultRouter.get("/:id", consultController.getConsultById);
consultRouter.post("/", consultController.createConsult);
consultRouter.patch("/:id", consultController.updateConsult);
consultRouter.delete("/:id", consultController.deleteConsult);
