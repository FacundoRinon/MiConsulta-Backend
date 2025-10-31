import { Request, Response } from "express";
import { DataService } from "../frameworks/data-services";
import {
  CountrySchema,
  CountryUpdateSchema,
} from "../core/schemas/country.schema";
import {
  DocumentTypeSchema,
  DocumentTypeUpdateSchema,
} from "../core/schemas/documentType.schema";

const dataService = new DataService();

export const documentTypeController = {
  async getAllDocumentTypes(req: Request, res: Response) {
    try {
      const documentTypes = await dataService.documentTypess.getAll({});
      res.json(documentTypes);
    } catch (error) {
      console.error("Error fetching document types:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  async getDocumentTypeById(req: Request, res: Response) {
    try {
      const documentType = await dataService.documentTypess.get(req.params.id);
      res.json(documentType);
    } catch (error) {
      console.error("Error fetching document type:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  async createDocumentType(req: Request, res: Response) {
    try {
      const parsedDocumentType = DocumentTypeSchema.parse(req.body);
      const newDocumentType = await dataService.documentTypess.create(
        parsedDocumentType
      );
      res.status(201).json(newDocumentType);
    } catch (error) {
      console.error("Error creating document type:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  async updateDocumentType(req: Request, res: Response) {
    try {
      const parsedData = DocumentTypeUpdateSchema.parse(req.body);
      const updatedDocumentType = dataService.documentTypess.update(
        req.params.id,
        parsedData
      );
      res.status(201).json(updatedDocumentType);
    } catch (error) {
      console.error("Error updating document type: ", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  async deleteDocumentType(req: Request, res: Response) {
    try {
      // Aca tendria que validar que el usuario tiene token o validacion de ser el usuario a eliminar (Solo el mismo usuario se puede eliminar)
      // Tambien se puede fijar si es un admin (El admin va a poder eliminar usuarios aunque no sea el dueño del mismo).
      const deletedDocumentType = dataService.documentTypess.delete(
        req.params.id
      );
      res.status(201).json(deletedDocumentType);
    } catch (error) {
      console.error("Error deleting document type: ", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },
};
