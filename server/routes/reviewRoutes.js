import express from "express";
const router = express.Router();
import {
  createReview,
  getAllReviews,
  getAReview,
  deleteReview,
} from "../controllers/reviewController.js";
import { authMiddleware, restrictTo } from "../middlewares/authMiddleware.js";

router.post("/", authMiddleware, createReview);
router.get("/", authMiddleware, getAllReviews);
router.get("/:id", authMiddleware, restrictTo("admin"), getAReview);
router.delete("/:id", authMiddleware, restrictTo("admin"), deleteReview);

export default router;
