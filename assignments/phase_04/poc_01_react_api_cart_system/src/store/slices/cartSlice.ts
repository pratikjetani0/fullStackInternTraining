import { createSlice } from "@reduxjs/toolkit";
import type { CartItem, Product } from "../../types";
import { loadCart, saveCart } from "../../utils/cartStorage";

const initialState: CartItem[] = loadCart();

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const product: Product = action.payload;

      const existingItem = state.find((item) => item.product.id === product.id);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.push({
          product,
          quantity: 1,
        });
      }

      saveCart(state);
    },

    increaseQuantity: (state, action) => {
      const item = state.find((item) => item.product.id === action.payload);

      if (item) {
        item.quantity += 1;
      }

      saveCart(state);
    },

    decreaseQuantity: (state, action) => {
      const item = state.find((item) => item.product.id === action.payload);

      if (item && item.quantity > 1) {
        item.quantity -= 1;
      }

      saveCart(state);
    },

    deleteItem: (state, action) => {
      const updated = state.filter(
        (item) => item.product.id !== action.payload,
      );

      saveCart(updated);
      return updated;
    },
  },
});

export const { addToCart, increaseQuantity, decreaseQuantity, deleteItem } =
  cartSlice.actions;

export default cartSlice.reducer;
