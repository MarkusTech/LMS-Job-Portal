import docCatModel from "../models/docCatModel.js";
import asyncHandler from "express-async-handler";
import validateMongoDbId from "../utils/validateMongoDbId.js";
import slugify from "slugify";

//** POST DOCUMENT CATEGORY */
const postDocCategory = asyncHandler(async (req, res) => {
  const { title, slug } = req.body;
  try {
    if (title) {
      slug = slugify(title);
    }
    const postDocCat = await docCatModel.create(req.body);
    res.status(200).json({
      status: true,
      message: "Documentation Category Created Successfully",
    });
  } catch (error) {
    console.log(error);
  }
});

//** GET ALL DOCS CATEGORY */
const getAllDocCat = asyncHandler(async (req, res) => {
  try {
    const result = await docCatModel.find();
    res.status(200).json({
      status: true,
      message: "Docs Category Fetched",
      result,
    });
  } catch (error) {
    console.log(error);
  }
});

//** GET A DOC */
const getADoc = asyncHandler(async (req, res) => {
  const { slug } = req.params;
  try {
    const result = await docCatModel.findOne({ slug });
    res.status(200).json({
      status: true,
      message: "Doc Category Found",
      result,
    });
  } catch (error) {
    console.log(error);
  }
});

//** DELETE DOC */
const deleteDoc = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const delDoc = await docCatModel.findByIdAndDelete(id);
    res.status(200).json({
      status: true,
      message: "Doc Category Deleted",
    });
  } catch (error) {
    console.log(error);
  }
});

//** UPDATE DOC */
const updateDoc = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { title, slug } = req.body;
  validateMongoDbId(id);
  try {
    if (title) {
      slug = slugify(title);
    }
    const updatedDoc = await docCatModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json({
      status: true,
      message: "Doc Category Updated",
      updatedDoc,
    });
  } catch (error) {
    console.log(error);
  }
});

export { postDocCategory, getADoc, getAllDocCat, deleteDoc, updateDoc };
