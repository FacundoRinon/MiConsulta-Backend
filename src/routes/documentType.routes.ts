import { Router } from "express";
import { documentTypeController } from "../controllers/documentType.controller";

export const documentTypeRouter = Router();

documentTypeRouter.get("/", documentTypeController.getAllDocumentTypes);
documentTypeRouter.get("/:id", documentTypeController.getDocumentTypeById);
documentTypeRouter.post("/", documentTypeController.createDocumentType);
documentTypeRouter.patch("/:id", documentTypeController.updateDocumentType);
documentTypeRouter.delete("/:id", documentTypeController.deleteDocumentType);
