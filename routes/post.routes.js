import express from "express";
import { createPost, getPosts } from "../controllers/post.controller.js";
import protectRoute from "../middleware/protectRoute.js";

const router = express.Router();

router.post("/", protectRoute, createPost);
router.get("/", protectRoute, getPosts);

export default router;
