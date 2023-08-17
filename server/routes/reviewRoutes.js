import express from "express";
const router = express.Router();
import {
  createReview,
  getAllReviews,
  getAReview,
  deleteReview,
  updateReviewStatus,
} from "../controllers/reviewController.js";
import { authMiddleware, restrictTo } from "../middlewares/authMiddleware.js";

//** POST METHOD */
router.post("/", authMiddleware, createReview);

//** GET METHOD */
router.get("/", authMiddleware, getAllReviews);
router.get("/:id", authMiddleware, restrictTo("admin"), getAReview);

//** DELETE METHOD */
router.delete("/:id", authMiddleware, restrictTo("admin"), deleteReview);

//** PUT METHOD */
router.put("/:id", authMiddleware, restrictTo("admin"), updateReviewStatus);

export default router;
