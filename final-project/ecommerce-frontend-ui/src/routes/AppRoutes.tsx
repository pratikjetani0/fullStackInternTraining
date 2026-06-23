import { createBrowserRouter } from "react-router-dom";

import MainLayout from "../components/layout/MainLayout";

import LoginPage from "../features/auth/pages/LoginPage";

import RegisterPage from "../features/auth/pages/RegisterPage";
import ProductsPage from "../features/products/pages/ProductsPage";
import ProductDetailsPage from "../features/products/pages/ProductDetailsPage";
import CartPage from "../features/cart/pages/CartPage";
import CheckoutPage from "../features/payments/pages/CheckoutPage";
import OrdersPage from "../features/orders/pages/OrdersPage";
import ProfilePage from "../features/auth/pages/ProfilePage";
import OrderDetailsPage from "../features/orders/pages/OrderDetailsPage";
import AdminRoute from "./AdminRoute";
import AdminProductsPage from "../features/admin/pages/AdminProductsPage";
import CreateProductPage from "../features/admin/pages/CreateProductPage";

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
      {
        path: "/checkout",
        element: <CheckoutPage />,
      },
      {
        path: "/orders",
        element: <OrdersPage />,
      },
      {
        path: "/profile",
        element: <ProfilePage />,
      },
      {
        path: "/orders/:id",
        element: <OrderDetailsPage />,
      },
      {
        path: "/admin/products",
        element: (
          <AdminRoute>
            <AdminProductsPage />
          </AdminRoute>
        ),
      },
      {
        path: "/admin/products/create",
        element: (
          <AdminRoute>
            <CreateProductPage />
          </AdminRoute>
        ),
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
