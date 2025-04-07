import { connectDB } from "./config/db.js";
import dotenv from "dotenv";
import express from "express";
import feedRoutes from "./routes/feed.js";

dotenv.config();

const app = express();

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*"),
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, PATCH, DELETE"
    );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use("/feed", feedRoutes);

app.listen(8080, () => {
  connectDB();
  console.log("server started on PORT 8080");
});
