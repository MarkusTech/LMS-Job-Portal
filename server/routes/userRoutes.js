import express from "express";
import {
  register,
  login,
  getAllUser,
  getAuser,
  updateUser,
  deleteUser,
} from "../controllers/userController.js";
import { authMiddleware, restrictTo } from "../middlewares/authMiddleware.js";

//** ROUTER */
const router = express.Router();

/* all post routes */
router.post("/register", register);
router.post("/login", login);

/* all get routes */
router.get("/all-user", authMiddleware, restrictTo("admin"), getAllUser);
router.get("/user/:id", authMiddleware, getAuser);

/* all put routes */
router.put("/update-profile", authMiddleware, updateUser);

/* all delete routes */
router.delete(
  "/delete-user/:id",
  authMiddleware,
  restrictTo("admin"),
  deleteUser
);

export default router;
