import express from "express";
import {
  register,
  login,
  getAllUser,
  getAuser,
  updateUser,
  deleteUser,
  blockUser,
  unblockUser,
  updatePassword,
  forgotPasswordToken,
  resetPassword,
} from "../controllers/userController.js";
import { authMiddleware, restrictTo } from "../middlewares/authMiddleware.js";

//** ROUTER */
const router = express.Router();

/* all post routes */
router.post("/register", register);
router.post("/login", login);
router.post("/forgot-password", forgotPasswordToken);

/* all get routes */
router.get("/all-user", authMiddleware, restrictTo("admin"), getAllUser);
router.get("/user/:id", authMiddleware, getAuser);

/* all put routes */
router.put("/update-profile", authMiddleware, updateUser);
router.put("/block/:id", authMiddleware, restrictTo("admin"), blockUser);
router.put("/unblock/:id", authMiddleware, restrictTo("admin"), unblockUser);
router.put("/update-password", authMiddleware, updatePassword);
router.put("/reset-password/:token", resetPassword);

/* all delete routes */
router.delete(
  "/delete-user/:id",
  authMiddleware,
  restrictTo("admin"),
  deleteUser
);

export default router;
