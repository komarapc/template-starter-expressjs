import express from "express";
import AuthController from "./auth.controller";
const router = express.Router();
const controller = new AuthController();
router.post("/", controller.login);

export default router;
