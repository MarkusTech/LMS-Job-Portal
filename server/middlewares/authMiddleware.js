import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";

const authMiddleware = asyncHandler(async (req, res, next) => {
  let token;
  if (req?.headers?.authorization?.startsWith("Bearer")) {
    token = req?.headers?.authorization?.split(" ")[1];
    try {
      if (token) {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userModel.findById(decoded?.id);
        req.user = user;
        next();
      }
    } catch (error) {
      throw new Error("Not Authorised, Please Login Again");
    }
  } else {
    throw new Error("There is no token attached to the header...");
  }
});

const restrictTo = (...roles) => {
  return asyncHandler(async (req, res, next) => {
    if (!roles.includes(req.user.roles)) {
      throw new Error("You are not authorized.");
    } else {
      next();
    }
  });
};

export { authMiddleware, restrictTo };
