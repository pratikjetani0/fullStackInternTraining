import { Request, Response } from "express";
import {
  addToCartService,
  clearCartService,
  getCartService,
  removeCartItemService,
  updateCartItemService,
} from "./cart.service";

//ADD TO CART
export const addToCart = async (req: Request, res: Response) => {
  try {
    const cartItem = await addToCartService(req.user!.userId, req.body);

    return res.status(201).json({
      success: true,
      data: cartItem,
    });
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

//GET CURRENT USER CART
export const getCart = async (req: Request, res: Response) => {
  try {
    const cart = await getCartService(req.user!.userId);

    return res.status(200).json({
      success: true,
      data: cart,
    });
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

//UPDATE CART ITEM QUANTITY
export const updateCartItem = async (req: Request, res: Response) => {
  try {
    const cartItem = await updateCartItemService(
      req.params.itemId as string,
      req.body,
    );

    return res.status(200).json({
      success: true,
      data: cartItem,
    });
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

//REMOVE THE CART ITEM
export const removeCartItem = async (req: Request, res: Response) => {
  try {
    await removeCartItemService(req.params.itemId as string);

    return res.status(200).json({
      success: true,
      message: "Item removed from cart",
    });
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

//CLEAR CART
export const clearCart = async (req: Request, res: Response) => {
  try {
    await clearCartService(req.user!.userId);

    return res.status(200).json({
      success: true,
      message: "Cart cleared",
    });
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
