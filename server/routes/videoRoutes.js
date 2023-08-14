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

router.post("/", videoController);
router.get("/:slug", getVideo);
router.get("/", getAllVideo);
router.delete("/:id", deleteVideo);
router.put("/id", updateVideo);

export default router;
