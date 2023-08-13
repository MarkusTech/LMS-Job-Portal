import express from "express";
const router = express.Router();
import { authMiddleware, restrictTo } from "../middlewares/authMiddleware.js";

import {
  createContact,
  getAllContact,
  getAContact,
  deleteContact,
  updateRContactStatus,
} from "../controllers/contactController.js";

router.post("/", authMiddleware, createContact);
router.get("/", authMiddleware, getAllContact);
router.get("/:id", authMiddleware, restrictTo("admin"), getAContact);
router.delete("/:id", authMiddleware, restrictTo("admin"), deleteContact);
router.put("/:id", authMiddleware, restrictTo("admin"), updateRContactStatus);

export default router;
