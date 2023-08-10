import express from "express";
import {
  createTutorial,
  getAllTutorials,
  getATutorial,
} from "../controllers/tutorialController.js";
import { authMiddleware, restrictTo } from "../middlewares/authMiddleware.js";

//** ROUTER */
const router = express.Router();

//** POST METHOD */
router.post(
  "/create-tutorial",
  authMiddleware,
  restrictTo("admin"),
  createTutorial
);

//** GET METHOD */
router.get("/", authMiddleware, restrictTo("admin"), getAllTutorials);
router.get("/:type/:slug", authMiddleware, restrictTo("admin"), getATutorial);

export default router;
