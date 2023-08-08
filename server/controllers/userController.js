import userModel from "../models/userModel.js";
import asyncHandler from "express-async-handler";

//** Create A User */
const register = asyncHandler(async (req, res, next) => {
  const { firstname, lastname, email, mobile, password, profession } = req.body;
  // find a existing user in database
  const existingUser = await userModel.findOne({ email });

  // validate if the user email is already created
  if (existingUser) {
    next("Email Already Existed Please Login");
  }
  // if not existed then CREATE USER
  const createUser = await userModel.create(req.body);
  res.status(200).json(createUser);
});

export { register };
