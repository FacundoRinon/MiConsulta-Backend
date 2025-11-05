import { Request, Response, NextFunction } from "express";
import { DataService } from "../../frameworks/data-services";

const dataService = new DataService();

/**
 * Middleware genérico para validar si el recurso pertenece al usuario o si es admin.
 * @param repoName nombre del repositorio en dataService (ej: "locationss", "consultss")
 * @param ownerField campo que representa al dueño (ej: "professional_id")
 * @param allowedRoles roles que pueden saltar la validación de propiedad (por defecto ["admin"])
 */
export const authorizeOwnerOrAdmin =
  (
    repoName: keyof DataService,
    ownerField: string,
    allowedRoles: string[] = ["admin"]
  ) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = (req as any).user;
      const resourceId = req.params.id;

      if (!user) {
        return res.status(401).json({ message: "No autenticado" });
      }

      // Si es admin u otro rol permitido → pasa directo
      if (allowedRoles.includes(user.role)) {
        return next();
      }

      // Verificar que exista el repo
      const repository = (dataService as any)[repoName];
      if (!repository || typeof repository.get !== "function") {
        console.error(`Repositorio '${repoName}' no válido`);
        return res.status(500).json({ message: "Error interno en validación" });
      }

      // Buscar el recurso
      const resource = await repository.get(resourceId);
      if (!resource) {
        return res.status(404).json({ message: "Recurso no encontrado" });
      }

      // Validar propiedad
      if (resource[ownerField] !== user.id) {
        return res.status(403).json({
          message: "No tenés permisos para modificar o eliminar este recurso",
        });
      }

      next();
    } catch (error) {
      console.error("Error en authorizeOwnerOrAdmin:", error);
      res.status(500).json({ message: "Error interno del servidor" });
    }
  };
