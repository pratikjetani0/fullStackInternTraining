import express from "express";
import {
  createUser,
  deleteUser,
  getAllUsers,
  getUserById,
  updateUser,
} from "../controllers/userController.js";
import {
  validateCreateUser,
  validateUpdateUser,
} from "../middlewares/inputValidator.js";

const router = express.Router();

router.post("/", validateCreateUser, createUser);
router.get("/", getAllUsers);
router.get("/:id", getUserById);
router.put("/:id", validateUpdateUser, updateUser);
router.delete("/:id", deleteUser);

export default router;
