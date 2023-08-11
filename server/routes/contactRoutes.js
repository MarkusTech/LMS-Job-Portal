import express from "express";
const router = express.Router();
import { createContact } from "../controllers/contactController.js";

router.post("/", createContact);

export default router;
