import { Router } from "express";
import { consultController } from "../controllers/consult.controller";
import { authMiddleware } from "../middlewares/AuthMiddleware/auth";

export const consultRouter = Router();

// CRUD restrictions
// Toda esta parte tengo que pensar mejor como va a funcionar.
consultRouter.get("/", authMiddleware, consultController.getAllConsults);
consultRouter.get("/:id", authMiddleware, consultController.getConsultById);

// Tengo que crear un middleware que solo permita crear una consulta si ambas partes estan de acuerdo
consultRouter.post("/", authMiddleware, consultController.createConsult);

// Tengo que crear un middleware que solo permita updatear y borrar una consulta a un professional que forme parte de la misma.
// A la vez tengo que ver como hacer para que un usuario pueda solicitar cambiar el horario de una consulta o eliminarla.
consultRouter.patch("/:id", authMiddleware, consultController.updateConsult);
consultRouter.delete("/:id", authMiddleware, consultController.deleteConsult);
