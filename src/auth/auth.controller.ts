import { Request, Response } from "express";
import AuthService, { AuthProps } from "./auth.service";
const authService = new AuthService();
class AuthController {
  async login(req: Request, res: Response) {
    const body: AuthProps = req.body;
    const result = await authService.authenticateUser(body);
    res.status(result?.statusCode || 200).json(result);
  }
}

export default AuthController;
