import { Request, Response, NextFunction } from "express";

// Middleware para permitir solo roles específicos o el mismo usuario
export const authorize =
  (allowedRoles: string[] = [], allowSelf = false) =>
  (req: Request, res: Response, next: NextFunction) => {
    const user = (req as any).user;

    if (!user) {
      return res.status(401).json({ message: "No autenticado" });
    }

    // Si puede modificarse a sí mismo
    if (allowSelf && req.params.id === user.id) {
      return next();
    }

    // Si tiene un rol permitido
    if (allowedRoles.includes(user.role)) {
      return next();
    }

    return res.status(403).json({ message: "No autorizado" });
  };
