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

//** POST METHOD */
router.post("/", authMiddleware, createContact);

//** GET METHOD */
router.get("/", authMiddleware, getAllContact);
router.get("/:id", authMiddleware, restrictTo("admin"), getAContact);

//** DELETE METHOD */
router.delete("/:id", authMiddleware, restrictTo("admin"), deleteContact);

//** PUT METHOD */
router.put("/:id", authMiddleware, restrictTo("admin"), updateRContactStatus);

export default router;
