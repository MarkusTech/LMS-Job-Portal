import videoCatModel from "../models/videoCatModel.js";
import slugify from "slugify";
import validateMongoDbId from "../utils/validateMongoDbId.js";
import asyncHandler from "express-async-handler";

const postVideoCategory = asyncHandler(async (req, res) => {
  try {
    if (req.body.title) {
      req.body.slug = slugify(req.body.title.toLowerCase());
    }
    const postVidCat = await videoCatModel.create(req.body);
    res.status(200).json({
      status: true,
      message: "Video Category Created Successfully",
      postVidCat,
    });
  } catch (error) {
    console.log(error);
  }
});

const getVideoCategory = asyncHandler(async (req, res) => {
  const { slug } = req.params;
  try {
    const result = await videoCatModel.findOne({ slug });
    res.status(200).json({
      status: true,
      message: "Video Category Found!",
      result,
    });
  } catch (error) {
    console.log(error);
  }
});

const getAllVideoCategory = asyncHandler(async (req, res) => {
  try {
    const result = await videoCatModel.find();
    res.status(200).json({
      status: true,
      message: "Video Categories Fetched",
      result,
    });
  } catch (error) {
    console.log(error);
  }
});

const deleteVideoCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const delVidCat = await videoCatModel.findByIdAndDelete(id);
    res.status(200).json({
      status: true,
      message: "Video Category Deleted Successfully",
    });
  } catch (error) {
    console.log(error);
  }
});

const updateVideoCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    if (req.body.title) {
      req.body.slug = slugify(req.body.title.toLowerCase());
    }
    const updateVidCat = await videoCatModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json({
      status: true,
      message: "Video Category Updated Successfully",
      updateVidCat,
    });
  } catch (error) {
    console.log(error);
  }
});

export {
  postVideoCategory,
  getVideoCategory,
  getAllVideoCategory,
  deleteVideoCategory,
  updateVideoCategory,
};
