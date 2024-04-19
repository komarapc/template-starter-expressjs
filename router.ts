import express from "express";
import userRoutes from "./src/users/users.routes";
import rolesRoutes from "./src/roles/roles.routes";
import tokenRoutes from "./src/tokens/tokens.routes";
import authRoutes from "./src/auth/auth.routes";
const router = express.Router();

router.get("/", (req, res) => {
  res.json({ statusCode: 200, statusMessage: "OK" });
});

router.use("/users", userRoutes);
router.use("/roles", rolesRoutes);
router.use("/tokens", tokenRoutes);
router.use("/auth", authRoutes);
export default router;
