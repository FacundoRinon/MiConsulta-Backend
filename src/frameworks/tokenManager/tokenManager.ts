import jwt from "jsonwebtoken";
import { jwtConstants } from "./constant";

export class TokenManager {
  static async createToken(payload: any): Promise<string> {
    return jwt.sign(payload, jwtConstants.secret as string, {
      expiresIn: "7d",
    });
  }

  static async validateToken(token: string): Promise<boolean> {
    try {
      jwt.verify(token, jwtConstants.secret as string);
      return true;
    } catch (error) {
      return false;
    }
  }

  static async decodeToken(token: string): Promise<any> {
    try {
      return jwt.decode(token);
    } catch (error) {
      return null;
    }
  }
}
