import { SECRET_KEY } from "@/config/app";
import { debugConsole, debugError, responseError } from "@/lib/utils";
import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";
type DecodeToken = {
  key: string;
  user_id: string;
  iat: number;
  exp: number;
};
class BearerMiddlewaree {
  public token: string = "";
  async getToken() {
    return this.token;
  }
  async setToken(token: string) {
    this.token = token;
  }

  public async verifyToken() {
    try {
      const token = await this.getToken();
      if (!token) return false;
      const decoded = jwt.verify(token, SECRET_KEY!);
      return true;
    } catch (error) {
      return false;
    }
  }
  public async decodeToken(token: string): Promise<DecodeToken | any> {
    return jwt.decode(token);
  }
  checkBearer = async (
    req: Request & { token?: string },
    res: Response,
    next: NextFunction
  ) => {
    try {
      const authorization = req.headers.authorization;
      debugConsole({ authorization });
      if (!authorization) {
        res.status(401).json(responseError({ code: 401 }));
        return;
      }
      const [bearer, token] = authorization.split(" ");
      if (bearer !== "Bearer" || !token) {
        res.status(401).json(responseError({ code: 401 }));
        return;
      }
      await this.setToken(token);
      const isValid = await this.verifyToken();
      if (!isValid) {
        res.status(401).json(responseError({ code: 401 }));
        return;
      }
      req.token = token;
    } catch (error) {
      debugError(error);
      res.status(500).json(responseError({ code: 500 }));
      return;
    }

    next();
  };
}

export default BearerMiddlewaree;
