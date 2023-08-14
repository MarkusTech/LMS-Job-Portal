import express from "express";
const router = express.Router();
import { authMiddleware, restrictTo } from "../middlewares/authMiddleware.js";
import {
  videoController,
  getVideo,
  getAllVideo,
  deleteVideo,
  updateVideo,
} from "../controllers/videoController.js";

//** POST METHOD */
router.post("/", authMiddleware, restrictTo("admin"), videoController);

//** GET METHOD */
router.get("/:slug", getVideo);
router.get("/", getAllVideo);

//** DELETE METHOD */
router.delete("/:id", deleteVideo);

//** PUT METHOD */
router.put("/:id", authMiddleware, restrictTo("admin"), updateVideo);

export default router;
