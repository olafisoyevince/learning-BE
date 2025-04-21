import jsonwebtoken from "jsonwebtoken";
import { ApiError } from "../lib/ApiError.js";

export const authMiddleware = (req, res, next) => {
  const authHeader = req.get("Authorization");

  if (!authHeader) {
    throw new ApiError({
      message: "Please add the Brearer Token for Authentication",
      statusCode: 401,
    });
  }

  const token = authHeader.split(" ")[1];

  let decodedToken;

  try {
    decodedToken = jsonwebtoken.verify(token, process.env.JWT_SECRET);
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

  if (!decodedToken) {
    throw new ApiError({
      message: "Not authenticated",
      statusCode: 401,
    });
  }

  req.userId = decodedToken.userId;
  next();
};
