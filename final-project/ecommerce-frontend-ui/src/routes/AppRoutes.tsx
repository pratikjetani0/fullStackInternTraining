import { createBrowserRouter } from "react-router-dom";

import MainLayout from "../components/layout/MainLayout";

import LoginPage from "../features/auth/pages/LoginPage";

import RegisterPage from "../features/auth/pages/RegisterPage";
import ProductsPage from "../features/products/pages/ProductsPage";
import ProductDetailsPage from "../features/products/pages/ProductDetailsPage";
import CartPage from "../features/cart/pages/CartPage";

export const router = createBrowserRouter([
  {
    element: <MainLayout />,

    children: [
      {
        path: "/",
        element: <ProductsPage />,
      },
      {
        path: "/products/:id",
        element: <ProductDetailsPage />,
      },
      {
        path: "/cart",
        element: <CartPage />,
      },
    ],
  },

  {
    path: "/login",
    element: <LoginPage />,
  },

  {
    path: "/register",
    element: <RegisterPage />,
  },
]);
