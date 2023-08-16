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

//** POST METHOD */
router.post("/", authMiddleware, restrictTo("admin"), createBlog);

//** GET METHOD */
router.get("/", getAllBlog);
router.get("/:slug", getABlog);

//** DELETE METHOD */
router.delete("/:id", authMiddleware, restrictTo("admin"), deleteBlog);

//** PUT METHOD */
router.put("/:id", authMiddleware, restrictTo("admin"), updateBlog);

export default router;
