import { Router } from "express";
import { consultController } from "../controllers/consult.controller";
import { consultTypeController } from "../controllers/consultType.controller";

export const consultTypeRouter = Router();

consultTypeRouter.get("/", consultTypeController.getAllConsultTypes);
consultTypeRouter.get("/:id", consultTypeController.getConsultTypeById);
consultTypeRouter.post("/", consultTypeController.createConsultType);
consultTypeRouter.patch("/:id", consultTypeController.updateConsultType);
consultTypeRouter.delete("/:id", consultTypeController.deleteConsultType);
