import express from "express";
const router = express.Router();
import { authMiddleware, restrictTo } from "../middlewares/authMiddleware.js";
import {
  postDocumentation,
  getDocumentation,
  getAllDocumentation,
  deleteDocumentation,
  updateDocumentation,
} from "../controllers/documentationController.js";

//** POST METHOD */
router.post("/", authMiddleware, restrictTo("admin"), postDocumentation);

//** GET METHOD */
router.get("/", getAllDocumentation);
router.get("/:id", getDocumentation);

//** DELETE METHOD */
router.delete("/:id", deleteDocumentation);

//** PUT METHOD */
router.put("/:id", authMiddleware, restrictTo("admin"), updateDocumentation);

export default router;
