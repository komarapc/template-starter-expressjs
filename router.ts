import express from "express";
import userRoutes from "./src/users/users.routes";
import rolesRoutes from "./src/roles/roles.routes";

const router = express.Router();

router.get("/", (req, res) => {
  res.json({ statusCode: 200, statusMessage: "OK" });
});

router.use("/users", userRoutes);
router.use("/roles", rolesRoutes);

export default router;
