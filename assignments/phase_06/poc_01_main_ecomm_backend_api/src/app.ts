import express from "express";
import { errorHandler } from "./middleware/error.middleware";
import { notFoundHandler } from "./middleware/notFound.middleware";

import authRoutes from "./modules/auth/auth.routes";
import userRoutes from "./modules/user/user.routes";
import adminUserRoutes from "./modules/admin/admin.routes";

import productRoutes from "./modules/product/product.routes";

import cartRoutes from "./modules/cart/cart.routes";

const app = express();

//Middleware
app.use(express.json());

//Routes
app.get("/", (_req, res) => {
  res.status(200).json({
    success: true,
    message: "Backend API Running",
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/admin/users", adminUserRoutes);

app.use("/api/products", productRoutes);

app.use("/api/cart", cartRoutes);

// 404 middleware
app.use(notFoundHandler);

//Error handling middleware
app.use(errorHandler);

export default app;
