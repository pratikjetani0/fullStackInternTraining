import type { CartItem } from "../types/index.js";

const CART_KEY = "mini-shop-cart";

//save tasks
export function saveCart(cart: CartItem[]) : void {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

// load tasks
export function loadCart(): CartItem[] {
  const storedCart = localStorage.getItem(CART_KEY);
  if (!storedCart) return [];

  return JSON.parse(storedCart) as CartItem[];
}