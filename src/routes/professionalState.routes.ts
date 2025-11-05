import { Router } from "express";
import { professionalStateController } from "../controllers/professionalState.controller";
import { authMiddleware } from "../middlewares/AuthMiddleware/auth";
import { authorize } from "../middlewares/AuthMiddleware/authorize";

export const professionalStateRouter = Router();

professionalStateRouter.get(
  "/",
  authMiddleware,
  professionalStateController.getAllProfessionalStates
);
professionalStateRouter.get(
  "/:id",
  authMiddleware,
  professionalStateController.getProfessionalStateById
);
professionalStateRouter.post(
  "/",
  authMiddleware,
  authorize(["admin"]),
  professionalStateController.createProfessionalState
);
professionalStateRouter.patch(
  "/:id",
  authMiddleware,
  authorize(["admin"]),
  professionalStateController.updateProfessionalState
);
professionalStateRouter.delete(
  "/:id",
  authMiddleware,
  authorize(["admin"]),
  professionalStateController.deleteProfessionalState
);
