import tutCategoryModel from "../models/tutCategoryModel.js";
import asyncHandler from "express-async-handler";
import slugify from "slugify";
import validateMongoDbId from "../utils/validateMongoDbId.js";

//** CREATE CATEGORY */
const postTutorialCategory = asyncHandler(async (req, res) => {
  try {
    if (req.body.title) {
      req.body.slug = slugify(req.body.title.toLowerCase());
    }
    const result = await tutCategoryModel.create(req.body);
    res.status(200).json({
      status: true,
      message: "Tutorial Category Created Successfully!",
      result,
    });
  } catch (error) {
    console.log(error);
  }
});

//** GET ALL CATEGORY */
const getAllCategory = asyncHandler(async (req, res) => {
  try {
    const result = await tutCategoryModel.find();
    res.status(200).json({
      status: true,
      message: "Tutorials Category Fetched Successfully",
      result,
    });
  } catch (error) {
    console.log(error);
  }
});

//** GET SINGLE CATEGORY */
const getACategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const result = await tutCategoryModel.findById(id);
    res.status(200).json({
      status: true,
      message: "Tutorial Category Found!",
      result,
    });
  } catch (error) {
    console.log(error);
  }
});

//** DELETE CATEGORY */
const deleteCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const result = await tutCategoryModel.findByIdAndDelete(id);
    res.status(200).json({
      status: true,
      message: "Tutorial Category Deleted Successfully!",
      result,
    });
  } catch (error) {
    console.log(error);
  }
});

//** UPDATE CATEGORY */
const updateCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    if (req.body.title) {
      req.body.slug = slugify(req.body.title.toLowerCase());
    }
    const result = await tutCategoryModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json({
      status: true,
      message: "Tutorial Category Updated Successfully!",
      result,
    });
  } catch (error) {
    console.log(error);
  }
});

export {
  postTutorialCategory,
  getAllCategory,
  getACategory,
  deleteCategory,
  updateCategory,
};
