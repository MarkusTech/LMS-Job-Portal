import userModel from "../models/userModel.js";
import asyncHandler from "express-async-handler";
import generateToken from "../utils/jwt.js";
import validateMongoDbId from "../utils/validateMongoDbId.js";

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

//** GET ALL USERS */
const getAllUser = asyncHandler(async (req, res) => {
  try {
    const allUser = await userModel.find();
    res.status(200).json({
      status: true,
      message: "All Users Fetched Successfully",
      allUser,
    });
  } catch (error) {
    throw new Error(error);
  }
});

//** GET A USER */
const getAuser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const getProfile = await userModel.findById(id);
    res.status(200).json({
      status: true,
      message: "User Found",
      getProfile,
    });
  } catch (error) {
    console.log(error);
  }
});

//** UPDATE USER */
const updateUser = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  validateMongoDbId(_id);
  try {
    const user = await userModel.findByIdAndUpdate(_id, req.body, {
      new: true,
    });
    res
      .status(200)
      .json({ status: true, message: "Profile Updated Successfully!", user });
  } catch (error) {
    throw new Error(error);
  }
});

//** DELETE USER */
const deleteUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const deleteUsers = await userModel.findByIdAndDelete(id);
    res.status(200).json({
      status: true,
      message: "User Deleted Successfullly",
      deleteUsers,
    });
  } catch (error) {
    console.log(error);
  }
});

//** Block a user */
const blockUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const block = await userModel.findOneAndUpdate(
      id,
      { isBlocked: true },
      { new: true }
    );
    res.status(200).json({
      status: true,
      message: `User Blocked Successfully`,
      block,
    });
  } catch (error) {
    console.log(error);
  }
});

//** unBlock a user */
const unblockUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const unblock = await userModel.findOneAndUpdate(
      id,
      { isBlocked: false },
      { new: true }
    );
    res.status(200).json({
      status: true,
      message: `User unblocked Successfully`,
      unblock,
    });
  } catch (error) {
    console.log(error);
  }
});

export { register, login, getAllUser, updateUser, deleteUser, getAuser };
