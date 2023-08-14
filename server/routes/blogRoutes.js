import express from "express";
const router = express.Router();
import { authMiddleware, restrictTo } from "../middlewares/authMiddleware.js";
import {
  createBlog,
  getABlog,
  getAllBlog,
  deleteBlog,
  updateBlog,
} from "../controllers/blogController.js";

router.post("/", authMiddleware, restrictTo("admin"), createBlog);
router.get("/", getAllBlog);
router.get("/:slug", getABlog);
router.delete("/:id", authMiddleware, restrictTo("admin"), deleteBlog);
router.put("/:id", authMiddleware, restrictTo("admin"), updateBlog);

export default router;
