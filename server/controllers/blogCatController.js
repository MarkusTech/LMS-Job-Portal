import blogCatModel from "../models/blogCatModel.js";
import slugify from "slugify";
import asyncHandler from "express-async-handler";
import validateMongoDbId from "../utils/validateMongoDbId.js";

//** Create Blog Category */
const createBlogCategory = asyncHandler(async (req, res) => {
  const { slug, title } = req.body;
  try {
    if (title) {
      slug = slugify(title);
    }
    const createBlogCat = await blogCatModel.create(req.body);
    res.status(200).json({
      status: true,
      message: "Blog Category Created Successfully",
    });
  } catch (error) {
    console.log(error);
  }
});

//** Get All Blog Category */
const getAllBlogCategory = asyncHandler(async (req, res) => {
  try {
    const result = await blogCatModel.find();
    res.status(200).json({
      status: true,
      message: "Blog Category Fetched",
      result,
    });
  } catch (error) {
    console.log(error);
  }
});

//** Get A Blog Category */
const getACategory = asyncHandler(async (req, res) => {
  const { slug } = req.params;
  try {
    const result = await blogCatModel.findOne({ slug });
    res.status(200).json({
      status: 200,
      message: "Blog Category Found!",
      result,
    });
  } catch (error) {
    console.log(error);
  }
});

//** Delete blog category */
const deleteBlogCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const deleteCat = await blogCatModel.findByIdAndDelete(id);
    res.status(200).json({
      status: true,
      message: "Blog Category Deleted Successfully",
    });
  } catch (error) {
    console.log(error);
  }
});

//** Update Blog Category */
const updateBlogCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { title, slug } = req.body;

  validateMongoDbId(id);
  try {
    if (title) {
      slug = slugify(title);
    }
    const updateCat = await blogCatModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json({
      status: 200,
      message: "Blog Category Updated Successfully",
      updateCat,
    });
  } catch (error) {
    console.log(error);
  }
});

export {
  createBlogCategory,
  getACategory,
  getAllBlogCategory,
  deleteBlogCategory,
  updateBlogCategory,
};
