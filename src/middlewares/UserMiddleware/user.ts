import { Request, Response, NextFunction } from "express";
import { authMiddleware } from "../AuthMiddleware/auth";

export const userMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  authMiddleware(req, res, () => {
    const user = (req as any).user;
    if (user.role !== "user") {
      return res.status(403).json({ message: "Acceso restringido a usuarios" });
    }
    next();
  });
};
