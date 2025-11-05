import { Router } from "express";
import { documentTypeController } from "../controllers/documentType.controller";
import { authMiddleware } from "../middlewares/AuthMiddleware/auth";
import { authorize } from "../middlewares/AuthMiddleware/authorize";

export const documentTypeRouter = Router();

// CRUD restrictions
// Read son accesibles con Token del Back
documentTypeRouter.get(
  "/",
  authMiddleware,
  documentTypeController.getAllDocumentTypes
);
documentTypeRouter.get(
  "/:id",
  authMiddleware,
  documentTypeController.getDocumentTypeById
);

// Create, Update y Delete son solo accesibles con token de admin
documentTypeRouter.post(
  "/",
  authMiddleware,
  authorize(["admin"]),
  documentTypeController.createDocumentType
);
documentTypeRouter.patch(
  "/:id",
  authMiddleware,
  authorize(["admin"]),
  documentTypeController.updateDocumentType
);
documentTypeRouter.delete(
  "/:id",
  authMiddleware,
  authorize(["admin"]),
  documentTypeController.deleteDocumentType
);
