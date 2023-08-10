import express from "express";
import { authMiddleware, restrictTo } from "../middlewares/authMiddleware.js";
//** ROUTER */
const router = express.Router();
import {
  postTutorialCategory,
  books,
} from "../controllers/tutorialCategoryController.js";

//** POST METHOD */
router.post("/post", authMiddleware, restrictTo("admin"), postTutorialCategory);

//** GET METHOD */
router.get("/book", books);

export default router;
