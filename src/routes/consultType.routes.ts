import { Router } from "express";
import { consultTypeController } from "../controllers/consultType.controller";
import { authMiddleware } from "../middlewares/AuthMiddleware/auth";
import { authorize } from "../middlewares/AuthMiddleware/authorize";

export const consultTypeRouter = Router();

// CRUD restrictions
// Read son accesibles siempre que se tenga un token del back
consultTypeRouter.get(
  "/",
  authMiddleware,
  consultTypeController.getAllConsultTypes
);
consultTypeRouter.get(
  "/:id",
  authMiddleware,
  consultTypeController.getConsultTypeById
);

// Create, Update y Delete son solo accesibles para los Admins
consultTypeRouter.post(
  "/",
  authMiddleware,
  authorize(["admin"]),
  consultTypeController.createConsultType
);
consultTypeRouter.patch(
  "/:id",
  authMiddleware,
  authorize(["admin"]),
  consultTypeController.updateConsultType
);
consultTypeRouter.delete(
  "/:id",
  authMiddleware,
  authorize(["admin"]),
  consultTypeController.deleteConsultType
);
