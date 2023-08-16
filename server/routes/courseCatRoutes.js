import express from "express";
const router = express.Router();
import { authMiddleware, restrictTo } from "../middlewares/authMiddleware.js";
import {
  postCourseCategory,
  getAllCourseCategory,
  getCourse,
  deleteCourseCat,
  updateACourseCat,
} from "../controllers/courseCatController.js";

router.get("/all", getAllCourseCategory);

router.post(
  "/",
  authMiddleware,
  restrictTo("admin", "instructor"),
  postCourseCategory
);
router.get(
  "/:slug",
  authMiddleware,
  restrictTo("admin", "instructor"),
  getCourse
);
router.delete(
  "/:id",
  authMiddleware,
  restrictTo("admin", "instructor"),
  deleteCourseCat
);
router.put(
  "/:id",
  authMiddleware,
  restrictTo("admin", "instructor"),
  updateACourseCat
);

export default router;
