import { Request, Response, NextFunction } from "express";

// Middleware para permitir solo roles específicos o el mismo usuario
export const authorize =
  (allowedRoles: string[] = [], allowSelf = false) =>
  (req: Request, res: Response, next: NextFunction) => {
    const data = req.data;
    if (!data) {
      return res.status(401).json({ message: "No autenticado" });
    }

    // Si puede modificarse a sí mismo
    if (allowSelf && req.params.id === data.id) {
      return next();
    }

    // Si tiene un rol permitido
    if (allowedRoles.includes(data.role)) {
      return next();
    }

    return res.status(403).json({ message: "No autorizado" });
  };
