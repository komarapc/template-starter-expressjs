import { Request, Response } from "express";
import TokenService from "./tokens.service";
const tokenService = new TokenService();
class TokenController {
  async index(req: Request, res: Response) {
    const tokens = await tokenService.findAll();
    res.status(tokens.statusCode).json(tokens);
  }
  async show(req: Request, res: Response) {
    const { id } = req.params;
    const token = await tokenService.findById(id);
    res.status(token.statusCode).json(token);
  }
  async store(req: Request, res: Response) {
    const token = req.body;
    const storeToken = await tokenService.upsert(token);
    res.status(storeToken.statusCode).json(storeToken);
  }
  async delete(req: Request, res: Response) {
    const { id } = req.params;
    const deleteToken = await tokenService.delete(id);
    res.status(deleteToken.statusCode).json(deleteToken);
  }
}
export default TokenController;
