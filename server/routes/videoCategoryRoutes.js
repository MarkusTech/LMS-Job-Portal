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

//** GET METHOD */
router.get("/all", authMiddleware, restrictTo("admin"), getAllVideoCategory);

//** POST METHOD */
router.post("/", authMiddleware, restrictTo("admin"), postVideoCategory);

//** GET METHOD */
router.get("/:slug", authMiddleware, restrictTo("admin"), getVideoCategory);

//** DELETE METHOD */
router.delete("/:id", authMiddleware, restrictTo("admin"), deleteVideoCategory);

//** PUT METHOD */
router.put("/:id", authMiddleware, restrictTo("admin"), updateVideoCategory);

export default router;
