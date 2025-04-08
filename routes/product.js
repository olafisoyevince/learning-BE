import express from "express";
import { createProduct } from "../controllers/product.js";

const router = express.Router();

router.post("/create", createProduct);

export default router;
