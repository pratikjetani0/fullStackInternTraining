import { Router } from "express";
import {
  createProduct,
  deleteProduct,
  getProductById,
  getProducts,
  updateProduct,
} from "./product.controller";
import { authMiddleware } from "../../middleware/auth.middleware";
import { roleMiddleware } from "../../middleware/role.middleware";
import { UserRole } from "../../constants/roles";
import { validate } from "../../middleware/validate.middleware";
import { createProductSchema, updateProductSchema } from "./product.schema";

const router = Router();

//PUBLIC ROUTE ANY ONE CAN SEE THIS
router.get("/", getProducts);
router.get("/:id", getProductById);

//PROTECTED ROUTES ONLY ADMIN CAN ACCESS
router.post(
  "/",
  authMiddleware,
  roleMiddleware(UserRole.ADMIN),
  validate(createProductSchema),
  createProduct,
);
router.put(
  "/:id",
  authMiddleware,
  roleMiddleware(UserRole.ADMIN),
  validate(updateProductSchema),
  updateProduct,
);
router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware(UserRole.ADMIN),
  deleteProduct,
);

export default router;
