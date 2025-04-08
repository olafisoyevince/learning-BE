import express from "express";
import {
  createProduct,
  deleteProduct,
  getProducts,
  updateProduct,
} from "../controllers/product.controller.js";

const router = express.Router();

router.get("/", getProducts);

router.post("/create", createProduct);

router.put("/:id", updateProduct);

router.delete("/delete/:id", deleteProduct);

export default router;
