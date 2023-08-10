import express from "express";
import createTutorial from "../controllers/tutorialController.js";

//** ROUTER */
const router = express.Router();

//** POST METHOD */
router.post("/create-tutorial", createTutorial);

export default router;
