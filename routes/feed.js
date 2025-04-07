import express from "express";

// import { check } from "express-validator";
import { createPost, getPosts } from "../controllers/feed.js";

const router = express.Router();

// GET /feed/posts
router.get("/posts", getPosts);

// POST /feed/create-post
router.post(
  "/create-post",
  //   [check("title").trim().isLength({ min: 5 }), check("content").trim()],
  createPost
);

export default router;
