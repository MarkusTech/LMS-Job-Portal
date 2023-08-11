import express from "express";
const router = express.Router();
import { subscribe, unsubscribe } from "../controllers/newsLetterController.js";

router.post("/", subscribe);
router.delete("/:id", unsubscribe);

export default router;
