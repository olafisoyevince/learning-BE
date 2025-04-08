import express from "express";
import { createPost, getPosts } from "../controllers/feed.js";

const router = express.Router();

router.get("/posts", getPosts);

router.post("/create-post", createPost);

export default router;
