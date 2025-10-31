import { Router } from "express";
import { professionalStateController } from "../controllers/professionalState.controller";

export const professionalStateRouter = Router();

professionalStateRouter.get(
  "/",
  professionalStateController.getAllProfessionalStates
);
professionalStateRouter.get(
  "/:id",
  professionalStateController.getProfessionalStateById
);
professionalStateRouter.post(
  "/",
  professionalStateController.createProfessionalState
);
professionalStateRouter.patch(
  "/:id",
  professionalStateController.updateProfessionalState
);
professionalStateRouter.delete(
  "/:id",
  professionalStateController.deleteProfessionalState
);
