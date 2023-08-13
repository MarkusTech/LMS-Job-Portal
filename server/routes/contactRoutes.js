import express from "express";
const router = express.Router();

import {
  createContact,
  getAllContact,
  getAContact,
  deleteContact,
  updateRContactStatus,
} from "../controllers/contactController.js";
