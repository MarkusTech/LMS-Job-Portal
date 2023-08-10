import express from "express";
import {
  createTutorial,
  getAllTutorials,
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

export default router;
