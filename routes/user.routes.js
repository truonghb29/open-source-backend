import express from "express";
import protectRoute from "../middleware/protectRoute.js";
import {
  deleteUserById,
  getUserById,
  getUsersForSidebar,
  updateUserById,
} from "../controllers/user.controller.js";

const router = express.Router();

router.get("/", protectRoute, getUsersForSidebar);
router.get("/:userId", protectRoute, getUserById);
router.delete("/:userId", protectRoute, deleteUserById);
router.patch("/:userId", protectRoute, updateUserById);

export default router;
