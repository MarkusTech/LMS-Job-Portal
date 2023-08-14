import express from "express";
const router = express.Router();
import { authMiddleware, restrictTo } from "../middlewares/authMiddleware.js";
import {
  postDocCategory,
  getADocCategory,
  getAllDocCatCategory,
  deleteDocCategory,
  updateDocCategory,
} from "../controllers/docCatController.js";

router.post("/", authMiddleware, restrictTo("admin"), postDocCategory);
router.get("/:slug", authMiddleware, restrictTo("admin"), getADocCategory);
router.get("/", getAllDocCatCategory);
router.delete("/:id", authMiddleware, restrictTo("admin"), deleteDocCategory);
router.put("/:id", authMiddleware, restrictTo("admin"), updateDocCategory);

export default router;
