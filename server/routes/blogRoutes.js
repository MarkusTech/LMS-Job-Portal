import express from "express";
const router = express.Router();
import { authMiddleware, restrictTo } from "../middlewares/authMiddleware.js";

export default router;
