import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Outlet } from "react-router-dom";
import type { CartItem, Product } from "./types";

interface LayoutProps {
  cart: CartItem[];
  wishlist: Product[];
}

const Layout = ({ cart, wishlist }: LayoutProps) => {
  return (
    <>
      <Header cart={cart} wishlist={wishlist} />
      <Outlet />
      <Footer />
    </>
  );
};

export default Layout;
