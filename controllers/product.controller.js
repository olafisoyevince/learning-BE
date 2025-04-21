import mongoose from "mongoose";
import Product from "../models/product.model.js";
import User from "../models/user.model.js";
import { successResponse } from "../lib/utils.js";
import { ApiError } from "../lib/ApiError.js";

export const createProduct = async (req, res, next) => {
  const product = req.body;

  if (!product?.name || !product?.price || !product?.image) {
    throw new ApiError({
      message: "Please provide all fields",
      statusCode: 422,
    });
  }

  const post = { ...product, creator: req.userId };

  try {
    const newProduct = new Product(post);

    console.log(newProduct, "newProduct");

    await newProduct.save();

    const user = await User.findById(req.userId);
    user.posts.push(newProduct._id);
    await user.save();

    successResponse({
      res,
      message: "Product created successfully!",
      data: {
        post: newProduct,
        creator: { _id: user._id, name: user.name },
      },
      statusCode: 201,
    });
  } catch (error) {
    if (!(error instanceof ApiError)) {
      error = new ApiError({
        message: "Server error",
        statusCode: 500,
        error,
      });
    }
    next(error);
  }
};

export const deleteProduct = async (req, res, next) => {
  const productId = req.params.id;
  const userId = req.userId;

  if (!mongoose.Types.ObjectId.isValid(productId)) {
    throw new ApiError({
      message: "Please provide valid product id",
      statuscode: 422,
    });
  }

  try {
    const productFromDb = await Product.findById(productId);

    if (!productFromDb) {
      throw new ApiError({
        message: "Product not found!",
        statusCode: 404,
      });
    }

    const isUser = productFromDb.creator.toString() === userId.toString();

    if (!isUser) {
      throw new ApiError({
        message: "You are not authorized to delete this product!",
        statusCode: 401,
      });
    }

    await Product.findByIdAndDelete(productId);

    const user = await User.findById(userId);

    user.posts.pull(productId);
    await user.save();

    successResponse({
      res,
      message: "Product deleted successfully!",
      statusCode: 200,
    });
  } catch (error) {
    console.log(`Error in delete product`, error);
    if (!(error instanceof ApiError)) {
      error = new ApiError({
        message: "Server error",
        statusCode: 500,
        error,
      });
    }

    next(error);
  }
};

export const getProducts = async (req, res, next) => {
  const userId = req.userId;

  try {
    const user = await User.findById(userId);

    if (!user) {
      throw new ApiError({
        message: "User not found!",
        statusCode: 404,
      });
    }

    const products = await Product.find();

    successResponse({
      res,
      message: "Products fetched successfully!",
      data: products,
      statusCode: 200,
    });
  } catch (error) {
    if (!(error instanceof ApiError)) {
      error = new ApiError({
        message: "Server error",
        statusCode: 500,
        error,
      });
    }

    next(error);
  }
};

export const updateProduct = async (req, res, next) => {
  const productId = req.params.id;
  const updatedData = req.body;
  const userId = req.userId;

  if (!mongoose.Types.ObjectId.isValid(productId)) {
    throw new ApiError({
      message: "Invalid product Id",
      statuscode: 404,
    });
  }

  if (!updatedData?.name || !updatedData?.price || !updatedData.image) {
    throw new ApiError({
      message: "Please provide all fields",
      statuscode: 422,
    });
  }

  try {
    const productFromDb = await Product.findById(productId);

    if (!productFromDb) {
      throw new ApiError({
        message: "Product not found!",
        statusCode: 404,
      });
    }

    const isUser = productFromDb.creator.toString() === userId.toString();

    if (!isUser) {
      throw new ApiError({
        message: "You are not authorized to update this product!",
        statusCode: 401,
      });
    }

    if (isUser) {
      const updatedProduct = await Product.findByIdAndUpdate(
        productId,
        updatedData,
        { new: true }
      );

      successResponse({
        res,
        message: "Product updated successfully!",
        product: updatedProduct,
        statusCode: 200,
      });
    }
  } catch (error) {
    if (!(error instanceof ApiError)) {
      error = new ApiError({
        message: "Server error",
        statusCode: 500,
        error,
      });
    }

    next(error);
  }
};
