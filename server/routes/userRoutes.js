import express from "express";
import {
  register,
  login,
  getAllUsers,
  updateUser,
} from "../controllers/userController.js";
import { authMiddleware, restrictTo } from "../middlewares/authMiddleware.js";

//** ROUTER */
const router = express.Router();

/* all post routes */
router.post("/register", register);
router.post("/login", login);

/* all get routes */
router.get("/all-user", getAllUsers);

/* all put routes */
router.put("/update-profile", authMiddleware, updateUser);

export default router;
