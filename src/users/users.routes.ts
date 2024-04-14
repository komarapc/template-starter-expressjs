import express from "express";
import {
  deleteHandler,
  indexHandler,
  showHandler,
  storeHandler,
  updateHandler,
} from "./users.controller";
const userRoutes = express.Router();

userRoutes.get("/", indexHandler);
userRoutes.get("/:id", showHandler);
userRoutes.post("/", storeHandler);
userRoutes.put("/:id", updateHandler);
userRoutes.delete(":/id", deleteHandler);

export default userRoutes;
