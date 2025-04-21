import { connectDB } from "./config/db.js";
import dotenv from "dotenv";
import express from "express";
import productRoutes from "./routes/product.route.js";
import authRoutes from "./routes/auth.route.js";
import { authMiddleware } from "./middleware/auth.middleware.js";
import { errorHandler } from "./lib/errorHandler.js";

dotenv.config();

const PORT = process.env.PORT || 8080;

const app = express();

// ALWAYS SET UP THE BODY PARSER! VERY IMPORTANT
app.use(express.json());

// TO GET RID OF CORS ERROR
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*"),
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, PATCH, DELETE"
    );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

// ORHER MIDDLEWARES

app.use("/api/products", authMiddleware, productRoutes);

app.use("/api/auth", authRoutes);

app.use(errorHandler);

app.listen(PORT, () => {
  connectDB();
  console.log("server started on PORT 8080");
});
