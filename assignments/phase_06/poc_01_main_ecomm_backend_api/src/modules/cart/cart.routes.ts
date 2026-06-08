import { Router } from "express";
import { authMiddleware } from "../../middleware/auth.middleware";
import { addToCartSchema, updateCartItemSchema } from "./cart.schema";
import { validate } from "../../middleware/validate.middleware";
import {
  addToCart,
  clearCart,
  getCart,
  removeCartItem,
  updateCartItem,
} from "./cart.controller";

const router = Router();

router.use(authMiddleware);

router.post("/", validate(addToCartSchema), addToCart);
router.get("/", getCart);
router.put("/:itemId", validate(updateCartItemSchema), updateCartItem);
router.delete("/:itemId", removeCartItem);
router.delete("/", clearCart);

export default router;
