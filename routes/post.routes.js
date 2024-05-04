import express from "express";
import {
  createPost,
  getPosts,
  updateLikes,
  deletePost,
} from "../controllers/post.controller.js";
import protectRoute from "../middleware/protectRoute.js";

const router = express.Router();

router.post("/", protectRoute, createPost);
router.get("/", protectRoute, getPosts);
router.put("/:id/likes", protectRoute, updateLikes);
router.delete("/:id", protectRoute, deletePost);

export default router;
