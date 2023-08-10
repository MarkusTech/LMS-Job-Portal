import express from "express";
import passport from "passport";
import generateToken from "../utils/jwt.js";
import userModel from "../models/userModel.js";
import asyncHandler from "express-async-handler";
const router = express.Router();

// routes
router.get(
  "/login/success",
  asyncHandler(async (req, res) => {
    if (req.user) {
      const findUser = await userModel.findOne({ email: req.user.email });
      if (findUser) {
        res.status(200).json({
          status: true,
          message: "Logged In Successfully!",
          token: generateToken(findUser?._id),
          role: findUser?.roles,
          username: findUser?.firstname + " " + findUser?.lastname,
          user_image: findUser?.user_image,
          from: "google",
        });
      } else {
        throw new Error("Something went wrong!");
      }
    } else {
      throw new Error("Something Went Wrong!");
    }
  })
);

router.get(
  "/login/failed",
  asyncHandler(async (req, res) => {
    res.status(401).json({
      status: false,
      message: "login failed",
    });
  })
);

router.get(
  "/google",
  asyncHandler(async (req, res) => {
    await passport.authenticate("goole", ["profile", "email"]);
  })
);

router.get(
  "/auth/google/callback",
  asyncHandler(async (req, res) => {
    await passport.authenticate("goole", {
      successRedirect: "/login/success",
      failureRedirect: "/login/failed",
    });
  })
);

router.get(
  "/logout",
  asyncHandler(async (req, res) => {
    res.logout();
    res.redirect("/");
  })
);

export default router;
