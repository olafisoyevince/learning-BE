import { connectDB } from "./config/db.js";
import dotenv from "dotenv";
import express from "express";
import feedRoutes from "./routes/feed.js";
import productRoutes from "./routes/product.js";

dotenv.config();

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
app.use("/feed", feedRoutes);

app.use("/products", productRoutes);

app.listen(8080, () => {
  connectDB();
  console.log("server started on PORT 8080");
});
