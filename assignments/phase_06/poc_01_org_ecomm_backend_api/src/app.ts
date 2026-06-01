import express from "express";
import userRoutes from "./modules/user/user.routes";
import { errorHandler } from "./middleware/error.middleware";
import { notFoundHandler } from "./middleware/notFound.middleware";

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

app.use("/api/users", userRoutes);

// 404 middleware
app.use(notFoundHandler);

//Error handling middleware
app.use(errorHandler);

export default app;
