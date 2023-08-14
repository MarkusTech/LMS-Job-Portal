import express from "express";
const router = express.Router();
import { authMiddleware, restrictTo } from "../middlewares/authMiddleware.js";
import {
  createBlogCategory,
  getACategory,
  getAllBlogCategory,
  deleteBlogCategory,
  updateBlogCategory,
} from "../controllers/blogCatController.js";

router.post("/", authMiddleware, restrictTo("admin"), createBlogCategory);
router.get("/:slug", authMiddleware, restrictTo("admin"), getACategory);
router.get("/", authMiddleware, restrictTo("admin"), getAllBlogCategory);
router.delete("/:id", authMiddleware, restrictTo("admin"), deleteBlogCategory);
router.put("/:id", authMiddleware, restrictTo("admin"), updateBlogCategory);

export default router;
