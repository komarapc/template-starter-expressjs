import { Request, Response } from "express";
import RoleService from "./roles.service";
import { Roles } from "@/data/rolesMockup";

const roleService = new RoleService();
class RoleController {
  async index(req: Request, res: Response) {
    const result = await roleService.findAll();
    res.status(result.statusCode).json(result);
  }
  async show(req: Request, res: Response) {
    const { id } = req.params;
    const result = await roleService.findById(id);
    res.status(result.statusCode).json(result);
  }
  async store(req: Request, res: Response) {
    const role: Roles = req.body;
    const result = await roleService.store(role);
    res.status(result.statusCode).json(result);
  }
  async update(req: Request, res: Response) {
    const { id } = req.params;
    const role: Roles = req.body;
    const result = await roleService.update(id, role);
    res.status(result.statusCode).json(result);
  }
  async delete(req: Request, res: Response) {
    const { id } = req.params;
    const result = await roleService.delete(id);
    res.status(result.statusCode).json(result);
  }
}
export default RoleController;
