import express from "express";
const router = express.Router();
import { authMiddleware, restrictTo } from "../middlewares/authMiddleware.js";
//** COURSE CONTROLLER */
import {
  createCourse,
  getAllCourse,
  getCourse,
  getParticularInstructorCourse,
  updateCourse,
  deleteCourse,
  checkEnrollment,
  freeEnrollment,
} from "../controllers/courseController.js";
//** LESSON CONTROLLER */
import {
  createLesson,
  deleteLesson,
  getLesson,
  getAllLesson,
  updateLesson,
} from "../controllers/lessonController.js";

//** ================= COURSES ================= */
router.post(
  "/",
  authMiddleware,
  restrictTo("admin", "instructor"),
  createCourse
);
router.get(
  "/instructor/all-courses",
  authMiddleware,
  restrictTo("admin", "instructor"),
  getParticularInstructorCourse
);
router.get("/all", getAllCourse);
router.get("/:slug", getCourse);
router.delete(
  "/:id",
  authMiddleware,
  restrictTo("admin", "instructor"),
  deleteCourse
);
router.put(
  "/:id",
  authMiddleware,
  restrictTo("admin", "instructor"),
  updateCourse
);

//** =============== Lesson ================= */
router.post(
  "/lesson/courseId",
  authMiddleware,
  restrictTo("admin", "instructor"),
  createLesson
);
router.delete(
  "/lesson/:courseId/:lessonId",
  authMiddleware,
  restrictTo("admin", "instructor"),
  deleteLesson
);
router.get(
  "/lesson/courseId",
  authMiddleware,
  restrictTo("admin", "instructor"),
  getAllLesson
);
router.get(
  "/lesson/:id",
  authMiddleware,
  restrictTo("admin", "instructor"),
  getLesson
);
router.put(
  "/update-lesson/:lessonId",
  authMiddleware,
  restrictTo("admin", "instructor"),
  updateLesson
);
router.post(
  "/check-enrollment/:courseId",
  authMiddleware,
  restrictTo("admin", "instructor"),
  checkEnrollment
);
router.post("/free-enrollment/:courseId", authMiddleware, freeEnrollment);

export default router;
