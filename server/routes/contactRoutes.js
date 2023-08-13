import express from "express";
const router = express.Router();

import {
  createContact,
  getAllContact,
  getAContact,
  deleteContact,
  updateRContactStatus,
} from "../controllers/contactController.js";

router.post("/", createContact);
router.get("/", getAllContact);
router.get("/:id", getAContact);
router.delete("/:id", deleteContact);
router.put("/:id", updateRContactStatus);

export default router;
