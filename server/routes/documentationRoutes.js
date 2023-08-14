import express from "express";
const router = express.Router();
import {
  postDocumentation,
  getDocumentation,
  getAllDocumentation,
  deleteDocumentation,
  updateDocumentation,
} from "../controllers/documentationController.js";

//** POST METHOD */
router.post("/", postDocumentation);

//** GET METHOD */
router.get("/", getAllDocumentation);
router.get("/:id", getDocumentation);

//** DELETE METHOD */
router.delete("/:id", deleteDocumentation);

//** PUT METHOD */
router.put("/:id", updateDocumentation);

export default router;
