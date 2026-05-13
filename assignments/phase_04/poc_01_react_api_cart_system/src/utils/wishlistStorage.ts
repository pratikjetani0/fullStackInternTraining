import type { Product } from "../types";

const WISHLIST_KEY = "scope-wishlist";

//Save wishlist
export function saveWishlist(wishlist: Product[]): void {
  localStorage.setItem(WISHLIST_KEY, JSON.stringify(wishlist));
}

// Load wishlist

export function loadWishlist(): Product[] {
  const stored = localStorage.getItem(WISHLIST_KEY);

  if (!stored) return [];

  return JSON.parse(stored);
}
