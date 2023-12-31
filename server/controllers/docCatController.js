import docCatModel from "../models/docCatModel.js";
import asyncHandler from "express-async-handler";
import validateMongoDbId from "../utils/validateMongoDbId.js";
import slugify from "slugify";

//** POST DOCUMENT CATEGORY */
const postDocCategory = asyncHandler(async (req, res) => {
  // const { title, slug } = req.body;
  try {
    if (req.body.title) {
      req.body.slug = slugify(req.body.title.toLowerCase());
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
const getAllDocCatCategory = asyncHandler(async (req, res) => {
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
const getADocCategory = asyncHandler(async (req, res) => {
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
const deleteDocCategory = asyncHandler(async (req, res) => {
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
const updateDocCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  // const { title, slug } = req.body;
  validateMongoDbId(id);
  try {
    if (req.body.title) {
      req.body.slug = slugify(req.body.title.toLowerCase());
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

export {
  postDocCategory,
  getADocCategory,
  getAllDocCatCategory,
  deleteDocCategory,
  updateDocCategory,
};
