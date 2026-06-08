import { AppDataSource } from "../../config/data-source";
import { CartItem } from "../../database/entities/CartItem.entity";
import { Product } from "../../database/entities/Product.entity";

export const cartRepository = AppDataSource.getRepository(CartItem);
export const productRepository = AppDataSource.getRepository(Product);

// FIND CART ITEM
export const findCartItem = async (userId: string, productId: string) => {
  return await cartRepository.findOne({
    where: {
      user: { id: userId },
      product: { id: productId },
    },
    relations: {
      user: true,
      product: true,
    },
  });
};

//SAVE CART ITEM
export const saveCartItem = async (cartItem: CartItem) => {
  return await cartRepository.save(cartItem);
};

//FIND THE CURRENT USER CART
export const findUserCart = async (userId: string) => {
  return await cartRepository.find({
    where: {
      user: { id: userId },
    },
    relations: {
      product: true,
    },
  });
};

//FIND CART BY ID
export const findCartItemById = async (itemId: string) => {
  return await cartRepository.findOne({
    where: { id: itemId },
    relations: {
      user: true,
      product: true,
    },
  });
};

//FIND PRODUCT BT ID
export const findProductById = async (id: string) => {
  return await productRepository.findOne({
    where: {
      id,
    },
  });
};

//REMOVE THE CART ITEM
export const deleteCartItemRepo = async (cartItem: CartItem) => {
  return await cartRepository.remove(cartItem);
};

//CLEAR CART
export const clearCartRepo = async (userId: string) => {
  return await cartRepository.delete({
    user: { id: userId },
  });
};
