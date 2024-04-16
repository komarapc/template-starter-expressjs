import express from "express";
import TokenController from "./tokens.controller";
const router = express.Router();
const controller = new TokenController();
router.get("/", controller.index);
router.get("/:id", controller.show);
router.post("/", controller.store);
router.delete("/:id", controller.delete);
export default router;
