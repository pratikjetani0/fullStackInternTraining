import React, { useState } from "react";
import HomePage from "./pages/HomePage";
import CartPage from "./pages/CartPage";
import { Route, Routes } from "react-router-dom";
import Layout from "./Layout";
import type { CartItem, Product } from "./types";
import { loadCart, saveCart } from "./utils/cartStorage";
import PageNotFound from "./pages/PageNotFound";
import { loadWishlist, saveWishlist } from "./utils/wishlistStorage";
import WishlistPage from "./pages/WishlistPage";

const App = () => {
  const [cart, setCart] = useState<CartItem[]>(loadCart());
  const [wishlist, setWishlist] = useState<Product[]>(loadWishlist());

  const updateCart = (updatedCart: CartItem[]) => {
    setCart(updatedCart);
    saveCart(updatedCart);
  };

  const handleAddToCart = (product: Product) => {
    const existingItem = cart.find((item) => item.product.id === product.id);

    let updatedCart: CartItem[];

    if (existingItem) {
      updatedCart = cart.map((item) =>
        item.product.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item,
      );
    } else {
      updatedCart = [...cart, { product, quantity: 1 }];
    }

    updateCart(updatedCart);
  };

  const increaseQuantity = (id: number) => {
    updateCart(
      cart.map((item) =>
        item.product.id === id
          ? { ...item, quantity: item.quantity + 1 }
          : item,
      ),
    );
  };

  const decreaseQuantity = (id: number) => {
    updateCart(
      cart
        .map((item) =>
          item.product.id === id
            ? {
                ...item,
                quantity: item.quantity - 1,
              }
            : item,
        )
        .filter((item) => item.quantity > 0),
    );
  };

  const deleteItem = (id: number) => {
    updateCart(cart.filter((item) => item.product.id !== id));
  };

  const toggleWishlist = (product: Product) => {
    const exists = wishlist.find((item) => item.id === product.id);

    const updatedWishlist = exists
      ? wishlist.filter((item) => item.id !== product.id)
      : [...wishlist, product];

    setWishlist(updatedWishlist);
    saveWishlist(updatedWishlist);
  };

  return (
    <>
      <Routes>
        <Route path="/" element={<Layout cart={cart} wishlist={wishlist} />}>
          <Route
            index
            element={
              <HomePage
                onAddToCart={handleAddToCart}
                onToggleWishlist={toggleWishlist}
                wishlist={wishlist}
              />
            }
          />
          <Route
            path="cart"
            element={
              <CartPage
                cart={cart}
                onIncrease={increaseQuantity}
                onDecrease={decreaseQuantity}
                onDelete={deleteItem}
              />
            }
          />
          <Route
            path="wishlist"
            element={<WishlistPage wishlist={wishlist} />}
          />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
};

export default App;
