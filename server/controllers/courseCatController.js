import courseCatModel from "../models/courseCategoryModel.js";
import asyncHandler from "express-async-handler";
import validateMongoDbId from "../utils/validateMongoDbId.js";
import slugify from "slugify";

const postCourseCategory = asyncHandler(async (req, res) => {
  try {
    if (req.body.title) {
      req.body.slug = slugify(req.body.title.toLowerCase());
    }
    const createCourseCat = await courseCatModel.create(req.body);
    res.status(200).json({
      status: true,
      message: "Course Category Created Successfully",
    });
  } catch (error) {
    console.log(error);
  }
});

const getAllCourseCategory = asyncHandler(async (req, res) => {
  try {
    const result = await courseCatModel.find();
    res.status(200).json({
      status: true,
      message: "Courses Category Fetched!",
      result,
    });
  } catch (error) {
    console.log(error);
  }
});

const getCourse = asyncHandler(async (req, res) => {
  const { slug } = req.params;
  try {
    const result = await courseCatModel.findOne({ slug });
    res.status(200).json({
      status: true,
      message: "Course Category Found!",
      result,
    });
  } catch (error) {
    console.log(error);
  }
});

const deleteCourseCat = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const deleteCourseCat = await courseCatModel.findByIdAndDelete(id);
    res.status(200).json({
      status: true,
      message: "Course Category Deleted!",
    });
  } catch (error) {
    throw new Error(error);
  }
});

const updateACourseCat = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    if (req.body.title) {
      req.body.slug = slugify(req.body.title);
    }
    const updateCourseCat = await courseCatModel.findByIdAndUpdate(
      id,
      req.body,
      {
        new: true,
      }
    );
    res.status(200).json({
      status: true,
      message: "Course Category Updated!",
      updateCourseCat,
    });
  } catch (error) {
    throw new Error(error);
  }
});

export {
  postCourseCategory,
  getAllCourseCategory,
  getCourse,
  deleteCourseCat,
  updateACourseCat,
};
