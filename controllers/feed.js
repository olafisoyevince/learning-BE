import Post from "../models/post.js";
// import { validationResult } from "express-validator/check";

export const getPosts = (req, res, next) => {
  const posts = [
    {
      _id: "10",
      title: "First Post",
      content: "This is the first post",
      imageUrl:
        "https://images.unsplash.com/photo-1742226111386-b6a84ef8e660?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      creator: {
        name: "seun",
      },
      date: new Date().toISOString(),
    },
  ];
  res.status(200).json({ posts });
};

export const createPost = (req, res, next) => {
  //   const errors = validationResult(req);

  //   if (!errors.isEmpty()) {
  //     return res.status(422).json({
  //       message: "Validation failed miserably!",
  //       errors: errors.array(),
  //     });
  //   }

  const title = req.body.title;
  const content = req.body.content;
  const imageUrl = req.body.imageUrl;

  const post = new Post({
    title,
    content,
    creator: { name: "seun" },
    imageUrl,
  });

  post
    .save()
    .then((result) => {
      console.log(result);
      res.status(201).json({
        message: "Post created successfully!",
        post: result,
      });
    })
    .catch((error) => console.log(error));
};
