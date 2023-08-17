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

//** POST METHOD */
router.post("/", authMiddleware, restrictTo("admin"), postDocCategory);

//** GET METHOD */
router.get("/:slug", authMiddleware, restrictTo("admin"), getADocCategory);
router.get("/", getAllDocCatCategory);

//** DELETE METHOD */
router.delete("/:id", authMiddleware, restrictTo("admin"), deleteDocCategory);

//** PUT METHOD */
router.put("/:id", authMiddleware, restrictTo("admin"), updateDocCategory);

export default router;
