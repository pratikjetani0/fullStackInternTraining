import { Router } from "express";
import { validate } from "../../middleware/validate.middleware";
import { deleteMe, getMe, updateMe } from "./user.controller";
import { updateUserSchema } from "./user.schema";
import { authMiddleware } from "../../middleware/auth.middleware";

const router = Router();

router.use(authMiddleware);

router.get("/me", getMe);
router.put("/me", validate(updateUserSchema), updateMe);
router.delete("/me", deleteMe);

export default router;
