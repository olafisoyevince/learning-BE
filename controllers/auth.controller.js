import jsonwebtoken from "jsonwebtoken";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { successResponse } from "../lib/utils.js";
import { ApiError } from "../lib/ApiError.js";

export const signUp = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const name = req.body.name;

  if (!email || !password || !name) {
    throw new ApiError({
      message: "Please provide all fields",
      statusCode: 422,
    });
  }

  bcrypt
    .hash(password, 12)
    .then((hashedPassword) => {
      const user = {
        email: email,
        password: hashedPassword,
        name: name,
      };

      const newUser = new User(user);

      return newUser.save();
    })
    .then((data) => {
      successResponse({
        res,
        message: "User created successfully!",
        data: {
          id: data._id,
          email: data.email,
          name: data.name,
        },
      });
    })
    .catch((error) => {
      if (!(error instanceof ApiError)) {
        error = new ApiError({
          message: "Server error",
          statusCode: 500,
          error,
        });
      }
      next(error);
    });
};

export const login = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ email: email })
    .then((user) => {
      if (!user) {
        throw new ApiError({
          message: "User not found",
          statusCode: 404,
        });
      }

      return bcrypt.compare(password, user.password).then((isEqual) => {
        if (!isEqual) {
          throw new ApiError({
            message: "Invalid credentials",
            statusCode: 422,
          });
        }

        const token = jsonwebtoken.sign(
          {
            email: email,
            userId: user._id.toString(),
          },
          process.env.JWT_SECRET,
          { expiresIn: "1h" }
        );

        successResponse({
          res,
          message: "User logged in successfully!",
          data: {
            token: token,
            userId: user._id.toString(),
          },
        });
      });
    })
    .catch((error) => {
      if (!(error instanceof ApiError)) {
        error = new ApiError({
          message: "Server error",
          statusCode: 500,
          error,
        });
      }
      next(error);
    });
};
