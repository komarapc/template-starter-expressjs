import express from "express";

import RoleController from "./roles.controller";
const controller = new RoleController();
const router = express.Router();

router.get("/", controller.index);
router.get("/:id", controller.show);
router.post("/", controller.store);
router.put("/:id", controller.update);
router.delete("/:id", controller.delete);

export default router;
