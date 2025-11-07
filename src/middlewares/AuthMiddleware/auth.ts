import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { jwtConstants } from "../../frameworks/tokenManager/constant";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Token no proporcionado" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, jwtConstants.secret as string) as {
      id: string;
      email: string;
      role: string;
    };

    // guardamos los datos en la request
    req.data = decoded;

    next();
  } catch (error) {
    console.error("Error verificando token:", error);
    return res.status(401).json({ message: "Token inválido o expirado" });
  }
};
