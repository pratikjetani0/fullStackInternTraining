import dotenv from "dotenv";
import express from "express";
import pool from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import errorHandler from "./middlewares/errorHandler.js";
import createUserTable from "./data/createUserTable.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

//Middlewares
app.use(express.json());

//Routes
app.use("/api/user", userRoutes);

//Error handling middleware
app.use(errorHandler);

// create table before starting server
createUserTable();

//Testing POSTGRES connection
app.get("/", async (req, res) => {
  const result = await pool.query("SELECT current_database()");
  res.send(`DB is: ${result.rows[0].current_database}`);
});

//Server running
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
