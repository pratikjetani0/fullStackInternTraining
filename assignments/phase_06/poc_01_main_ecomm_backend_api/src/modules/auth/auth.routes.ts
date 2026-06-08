import { Router } from "express";
import { validate } from "../../middleware/validate.middleware";
import { loginSchema, registerSchema } from "./auth.schema";
import { login, logout, register } from "./auth.controller";
import { authMiddleware } from "../../middleware/auth.middleware";

const router = Router();

router.post("/register", validate(registerSchema), register);
router.post("/login", validate(loginSchema), login);
router.post("/logout", authMiddleware, logout);

export default router;
