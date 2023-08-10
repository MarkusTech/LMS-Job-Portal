import express from "express";
import { authMiddleware, restrictTo } from "../middlewares/authMiddleware.js";
//** ROUTER */
const router = express.Router();
import {
  postTutorialCategory,
  getAllCategory,
  getACategory,
  deleteCategory,
  updateCategory,
} from "../controllers/tutorialCategoryController.js";

//** POST METHOD */
router.post("/post", authMiddleware, restrictTo("admin"), postTutorialCategory);

//** GET METHOD */
router.get("/get-categories", getAllCategory);
router.get("/get-category/:id", getACategory);

//** DELETE METHOD */
router.delete(
  "/delete-category/:id",
  authMiddleware,
  restrictTo("admin"),
  deleteCategory
);

//** PUT METHOD */
router.put(
  "/update-category/:id",
  authMiddleware,
  restrictTo("admin"),
  updateCategory
);

export default router;
