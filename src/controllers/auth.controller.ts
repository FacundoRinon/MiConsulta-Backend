import { Request, Response } from "express";
import { TokenManager } from "../frameworks/tokenManager/tokenManager"; // importa tu clase
import bcrypt from "bcryptjs";
import { DataService } from "../frameworks/data-services";

const dataService = new DataService();

export const authController = {
  async userLogin(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res
          .status(400)
          .json({ error: "Email y contraseña son requeridos" });
      }

      // Buscar usuario en la base de datos
      const userArray = await dataService.userss.getAll({
        email: email,
      });
      const user = userArray[0];
      if (!user) {
        return res.status(404).json({ error: "Usuario no encontrado" });
      }

      if (!user.password) {
        return res
          .status(400)
          .json({ error: "El usuario no tiene una contraseña registrada" });
      }

      // Comparar contraseña
      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) {
        return res.status(401).json({ error: "Contraseña incorrecta" });
      }

      // Crear token con los datos que quieras incluir
      const token = await TokenManager.createToken({
        id: user.id,
        email: user.email,
        role: "user",
      });

      // Enviar token y algunos datos básicos
      return res.status(200).json({
        message: "Login exitoso",
        token,
        user: user,
      });
    } catch (error) {
      console.error("Error en userLogin:", error);
      return res.status(500).json({ error: "Error interno del servidor" });
    }
  },

  async professionalLogin(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res
          .status(400)
          .json({ error: "Email y contraseña son requeridos" });
      }

      // Buscar usuario en la base de datos
      const professionalArray = await dataService.professionalss.getAll({
        email: email,
      });
      const professional = professionalArray[0];
      if (!professional) {
        return res.status(404).json({ error: "Profesional no encontrado" });
      }

      if (!professional.password) {
        return res
          .status(400)
          .json({ error: "El profesional no tiene una contraseña registrada" });
      }

      // Comparar contraseña
      const validPassword = await bcrypt.compare(
        password,
        professional.password
      );
      if (!validPassword) {
        return res.status(401).json({ error: "Contraseña incorrecta" });
      }

      // Crear token con los datos que quieras incluir
      const token = await TokenManager.createToken({
        id: professional.id,
        email: professional.email,
        role: "professional",
      });

      // Enviar token y algunos datos básicos
      return res.status(200).json({
        message: "Login exitoso",
        token,
        professional: professional,
      });
    } catch (error) {
      console.error("Error en professionalLogin:", error);
      return res.status(500).json({ error: "Error interno del servidor" });
    }
  },
};
