import Product from "../models/product.js";

export const createProduct = (req, res, next) => {
  const product = req.body;

  if (!product?.name || !product?.price || !product?.image) {
    return res.status(422).json({
      message: "Please provide all fields",
      statusCode: 422,
      success: false,
    });
  }

  const newProduct = new Product(product);

  newProduct
    .save()
    .then((data) => {
      console.log(data);
      res.status(201).json({
        message: "Product created successfully!",
        product: data,
      });
    })
    .catch((error) => console.log(error));
};
