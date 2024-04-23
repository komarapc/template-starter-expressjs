import express from "express";
import {
  deleteHandler,
  indexHandler,
  showHandler,
  storeHandler,
  updateHandler,
} from "./users.controller";
const userRoutes = express.Router();
import BearerMiddlewaree from "@/middleware/bearer.middleware";
const bearer = new BearerMiddlewaree();
userRoutes.get("/", bearer.checkBearer, indexHandler);
userRoutes.get("/:id", showHandler);
userRoutes.post("/", storeHandler);
userRoutes.put("/:id", updateHandler);
userRoutes.delete(":/id", deleteHandler);

export default userRoutes;
