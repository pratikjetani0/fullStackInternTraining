import { Router } from "express";
import { validate } from "../../middleware/validate.middleware";
import { createUser, deleteUser, getUserById, getUsers, updateUser } from "./user.controller";
import { createUserSchema, updateUserSchema } from "./user.schema";

const router = Router();

router.post("/", validate(createUserSchema), createUser);
router.get("/", getUsers);
router.get("/:id", getUserById);
router.put("/:id", validate(updateUserSchema), updateUser)
router.delete("/:id", deleteUser);

export default router;
