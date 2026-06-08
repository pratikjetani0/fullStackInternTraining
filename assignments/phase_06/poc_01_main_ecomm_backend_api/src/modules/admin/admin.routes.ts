import { Router } from "express";
import {
  deleteUser,
  getUserById,
  getUsers,
  updateUser,
} from "./admin.controller";
import { validate } from "../../middleware/validate.middleware";
import { updateUserSchema } from "../user/user.schema";
import { authMiddleware } from "../../middleware/auth.middleware";
import { roleMiddleware } from "../../middleware/role.middleware";
import { UserRole } from "../../constants/roles";

const router = Router();

router.use(authMiddleware, roleMiddleware(UserRole.ADMIN));

router.get("/", getUsers);
router.get("/:id", getUserById);
router.put("/:id", validate(updateUserSchema), updateUser);
router.delete("/:id", deleteUser);

export default router;
