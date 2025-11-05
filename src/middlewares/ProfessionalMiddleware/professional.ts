import { Request, Response, NextFunction } from "express";
import { authMiddleware } from "../AuthMiddleware/auth";

export const professionalMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  authMiddleware(req, res, () => {
    const professional = (req as any).professional;
    if (professional.role !== "user") {
      return res
        .status(403)
        .json({ message: "Acceso restringido a profesionales" });
    }
    next();
  });
};
