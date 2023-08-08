import express from "express";
import { register } from "../controllers/userController.js";

//** ROUTER */
const router = express.Router();

router.post("/register", register);

export default router;
