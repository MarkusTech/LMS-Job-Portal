import documentationModel from "../models/documentationModel.js";
import asyncHandler from "express-async-handler";
import validateMongoDbId from "../utils/validateMongoDbId.js";
import slugify from "slugify";

//** Create post video */
const postDocumentation = asyncHandler(async (req, res) => {
  try {
    if (req.body.title) {
      req.body.slug = slugify(req.body.title.toLowerCase());
    }
    const video = await documentationModel.create(req.body);
    res.status(200).json({
      status: true,
      message: "Documentation Posted Successfully",
    });
  } catch (error) {
    console.log(error);
  }
});

//** Get A Video */
const getDocumentation = asyncHandler(async (req, res) => {
  const { slug } = req.params;
  try {
    const result = await documentationModel.findOne({ slug });
    res.status(200).json({
      status: true,
      message: "Documentation Found!",
      result,
    });
  } catch (error) {
    console.log(error);
  }
});

//** GET ALL VIDEO */
const getAllDocumentation = asyncHandler(async (req, res) => {
  try {
    const result = await documentationModel.find();
    res.status(200).json({
      status: true,
      message: "Documentation Fetched",
      result,
    });
  } catch (error) {
    console.log(error);
  }
});

//** DELETE VIDEO */
const deleteDocumentation = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const deleteDoc = await documentationModel.findByIdAndDelete(id);
    res.status(200).json({
      status: true,
      message: "Documentation Deleted Successfully",
    });
  } catch (error) {
    console.log(error);
  }
});

//** UPDATE VIDEO */
const updateDocumentation = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    if (req.body.title) {
      req.body.slug = slugify(req.body.title.toLowerCase());
    }
    const updateDoc = await documentationModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json({
      status: true,
      message: "Documentation Updated Successfully",
    });
  } catch (error) {
    console.log(error);
  }
});

export {
  postDocumentation,
  getDocumentation,
  getAllDocumentation,
  deleteDocumentation,
  updateDocumentation,
};
