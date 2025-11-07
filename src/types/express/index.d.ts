import { DecodedToken } from "../../frameworks/tokenManager/token.types";

declare global {
  namespace Express {
    export interface Request {
      data?: DecodedToken;
    }
  }
}
