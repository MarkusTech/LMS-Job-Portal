import userModel from "../models/userModel.js";
import asyncHandler from "express-async-handler";
import generateToken from "../utils/jwt.js";

//** Create A User */
const register = asyncHandler(async (req, res, next) => {
  const { firstname, lastname, email, mobile, password, profession } = req.body;
  // validation
  if (!firstname) {
    next("Firstname is required");
  }
  if (!lastname) {
    next("Lastname is required");
  }
  if (!email) {
    next("Email is required");
  }
  if (!mobile) {
    next("Mobile Number is required");
  }
  if (!password) {
    next("Password is required");
  }
  if (!profession) {
    next("Profession is required");
  }

  // validate if the user is existing
  const existingUser = await userModel.findOne({ email });
  if (existingUser) {
    next("Email Already Existed Please Login");
  } else {
    // if not existed then CREATE USER
    const createUser = await userModel.create(req.body);
    res.status(200).json({
      status: true,
      message: "User Created Successfully",
      createUser,
    });
  }
});

//** LOGIN */
const login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  // validation
  if (!email || !password) {
    next("Please provide all fields");
  }

  // Check if user existed
  const user = await userModel.findOne({ email });
  if (!user) {
    next("Invalid Username or Password");
  }
  // compare password
  const matchPassword = await user.isPasswordMatched(password);
  if (!matchPassword) {
    next("Invalid Username or Password");
  } else {
    // login
    res.status(200).json({
      status: true,
      message: "Login Successfully",
      token: generateToken(user?._id),
      role: user?.roles,
      username: user?.firstname + " " + user?.lastname,
      user_image: user?.user_image,
    });
  }
});

export { register, login };
