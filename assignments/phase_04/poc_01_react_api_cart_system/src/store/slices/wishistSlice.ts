import { createSlice } from "@reduxjs/toolkit";
import type { Product } from "../../types";
import { loadWishlist, saveWishlist } from "../../utils/wishlistStorage";

const initialState: Product[] = loadWishlist();

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    toggleWishlist: (state, action) => {
      const product = action.payload;

      const exists = state.find((item) => item.id === product.id);

      let updated;

      if (exists) {
        updated = state.filter((item) => item.id !== product.id);
      } else {
        updated = [...state, product];
      }

      saveWishlist(updated);
      return updated;
    },
  },
});

export const { toggleWishlist } = wishlistSlice.actions;

export default wishlistSlice.reducer;
