import { AppDataSource } from "../../config/data-source";
import { Product } from "../../database/entities/Product.entity";
import {
  cartRepository,
  clearCartRepo,
  deleteCartItemRepo,
  findCartItem,
  findCartItemById,
  findProductById,
  findUserCart,
  saveCartItem,
} from "./cart.repository";
import { AddToCartDto, UpdateCartItemDto } from "./cart.schema";

//ADD TO CART SERVICE
export const addToCartService = async (
  userId: string,
  payload: AddToCartDto,
) => {
  const product = await findProductById(payload.productId);

  if (!product) {
    throw new Error("Product not found");
  }

  const existingCartItem = await findCartItem(userId, payload.productId);

  if (existingCartItem) {
    const totalQuantity = existingCartItem.quantity + payload.quantity;

    if (totalQuantity > product.stock) {
      throw new Error("Insufficient stock");
    }

    existingCartItem.quantity = totalQuantity;

    return await saveCartItem(existingCartItem);
  }

  //CHECK QUANTITY OF PRODUCT
  if (payload.quantity > product.stock) {
    throw new Error("Insufficient stock");
  }

  const cartItem = cartRepository.create({
    quantity: payload.quantity,
    user: { id: userId },
    product: { id: payload.productId },
  });

  return await saveCartItem(cartItem);
};

//GET CURRENT USER CART
export const getCartService = async (userId: string) => {
  return await findUserCart(userId);
};

//UPDATE CART ITEM QUANTITY
export const updateCartItemService = async (
  itemId: string,
  payload: UpdateCartItemDto,
) => {
  const cartItem = await findCartItemById(itemId);

  if (!cartItem) {
    throw new Error("Cart item not found");
  }

  //CHECK QUANTITY OF PRODUCT
  if (payload.quantity > cartItem.product.stock) {
    throw new Error("Insufficient stock");
  }

  cartItem.quantity = payload.quantity;

  return await saveCartItem(cartItem);
};

//REMOVE CART ITEM
export const removeCartItemService = async (itemId: string) => {
  const cartItem = await findCartItemById(itemId);

  if (!cartItem) {
    throw new Error("Cart item not found");
  }

  await deleteCartItemRepo(cartItem);
};

//CLEAR ENTIRE CART
export const clearCartService = async (userId: string) => {
  await clearCartRepo(userId);
};
