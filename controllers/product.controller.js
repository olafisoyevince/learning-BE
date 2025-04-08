import mongoose from "mongoose";
import Product from "../models/product.model.js";

export const createProduct = async (req, res, next) => {
  const product = req.body;

  if (!product?.name || !product?.price || !product?.image) {
    return res.status(422).json({
      message: "Please provide all fields",
      statusCode: 422,
      success: false,
    });
  }

  const newProduct = new Product(product);

  await newProduct
    .save()
    .then((data) => {
      console.log(data);
      res.status(201).json({
        message: "Product created successfully!",
        product: data,
      });
    })
    .catch((error) => console.log(`Error in create product`, error));
};

export const deleteProduct = async (req, res, next) => {
  const productId = req.params.id;

  if (!productId) {
    return res.status(422).json({
      message: "Please provide product id",
      statusCode: 422,
      success: false,
    });
  }

  Product.findByIdAndDelete(productId)
    .then((data) => {
      res.status(201).json({
        message: "Post deleted successfully!",
        statusCode: 200,
        success: true,
      });
    })
    .catch((error) => {
      console.log(`Error in delete product`, error);
      res.status(404).json({
        message: "Product not found!",
        statusCode: 404,
        success: false,
      });
    });
};

export const getProducts = async (req, res, next) => {
  Product.find()
    .then((data) => {
      res.status(200).json({
        message: "Products fetched successfully!",
        products: data,
        statusCode: 200,
        success: true,
      });
    })
    .catch((error) => {
      console.log(`Error in get products`, error);
      res.status(404).json({
        message: "Products not found!",
        statusCode: 404,
        success: false,
      });
    });
};

export const updateProduct = async (req, res, next) => {
  const productId = req.params.id;
  const product = req.body;

  if (!mongoose.Types.ObjectId.isValid(productId)) {
    return res.status(404).json({
      message: "Invalid product Id",
      statuscode: 404,
      success: false,
    });
  }

  if (!product?.name || !product?.price || !product.image) {
    return res.status(422).json({
      message: "Please provide all fields",
      statuscode: 422,
      success: false,
    });
  }

  Product.findByIdAndUpdate(productId, product, { new: true })
    .then((data) => {
      return res.status(200).json({
        message: "Product updated successfully!",
        product: data,
        statusCode: 200,
        success: true,
      });
    })
    .catch((error) => {
      console.log(`Error in update product`, error);
      return res.status(404).json({
        message: "Product not found!",
        statusCode: 404,
        success: false,
      });
    });
};
