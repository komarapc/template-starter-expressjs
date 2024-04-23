import { Request, Response } from "express";
import UserService from "./users.service";
import { UserType } from "@/data/usersMockup";
import { CustomRequest } from "@/lib/utils";

const service = new UserService();

const indexHandler = async (req: CustomRequest, res: Response) => {
  const { token } = req;
  console.log({ token });
  const result = await service.findAll();
  res.status(result.statusCode).json(result);
};
const showHandler = async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await service.findById(id);
  res.status(result.statusCode).json(result);
};
const storeHandler = async (req: Request, res: Response) => {
  const user: UserType = req.body;
  const result = await service.store(user);
  res.status(result.statusCode).json(result);
};
const updateHandler = async (req: Request, res: Response) => {
  const { id } = req.params;
  const user: UserType = req.body;
  const result = await service.update(id, user);
  res.status(result.statusCode).json(result);
};
const deleteHandler = async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await service.delete(id);
  res.status(result.statusCode).json(result);
};

export {
  indexHandler,
  showHandler,
  storeHandler,
  updateHandler,
  deleteHandler,
};
