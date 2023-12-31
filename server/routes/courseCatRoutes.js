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

//** GET ALL METHOD */
router.get("/all", getAllCourseCategory);

//** POST METHOD */
router.post(
  "/",
  authMiddleware,
  restrictTo("admin", "instructor"),
  postCourseCategory
);

//** GET METHOD */
router.get(
  "/:slug",
  authMiddleware,
  restrictTo("admin", "instructor"),
  getCourse
);

//** DELETE METHOD */
router.delete(
  "/:id",
  authMiddleware,
  restrictTo("admin", "instructor"),
  deleteCourseCat
);

//** PUT METHOD */
router.put(
  "/:id",
  authMiddleware,
  restrictTo("admin", "instructor"),
  updateACourseCat
);

export default router;
