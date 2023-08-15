import express from "express";
const router = express.Router();
import { authMiddleware, restrictTo } from "../middlewares/authMiddleware.js";
import {
  postVideoCategory,
  getVideoCategory,
  getAllVideoCategory,
  deleteVideoCategory,
  updateVideoCategory,
} from "../controllers/videoCategoryController.js";

router.post("/", authMiddleware, restrictTo("admin"), postVideoCategory);
router.get("/", getAllVideoCategory);
router.get("/:slug", authMiddleware, restrictTo("admin"), getVideoCategory);
router.delete("/:id", authMiddleware, restrictTo("admin"), deleteVideoCategory);
router.put("/:id", authMiddleware, restrictTo("admin"), updateVideoCategory);

export default router;
