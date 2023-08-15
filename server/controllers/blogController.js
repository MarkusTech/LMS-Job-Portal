import blogModel from "../models/blogModel.js";
import asyncHandler from "express-async-handler";
import validateMongoDbId from "../utils/validateMongoDbId.js";
import slugify from "slugify";

//** CREATE or POST BLOG */
const createBlog = asyncHandler(async (req, res) => {
  // const { title, slug } = req.body;
  try {
    if (req.body.title) {
      req.body.slug = slugify(req.body.title.toLowerCase());
    }
    const blog = await blogModel.create(req.body);
    res.status(200).json({
      status: true,
      message: "Blog Posted Successfully",
    });
  } catch (error) {
    console.log(error);
  }
});

//** GET A BLOG */
const getABlog = asyncHandler(async (req, res) => {
  const { slug } = req.params;
  try {
    const result = await blogModel.findOne({ slug });
    res.status(200).json({
      status: true,
      message: "Blog Found!",
      result,
    });
  } catch (error) {
    console.log(error);
  }
});

//** GET ALL BLOG */
const getAllBlog = asyncHandler(async (req, res) => {
  try {
    const result = await blogModel.find();
    res.status(200).json({
      status: true,
      message: "Blogs Found",
      result,
    });
  } catch (error) {
    console.log(error);
  }
});

//** DELETE BLOG */
const deleteBlog = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const delBlog = await blogModel.findByIdAndDelete(id);
    res.status(200).json({
      status: true,
      message: "Blog Deleted Successfully",
    });
  } catch (error) {
    console.log(error);
  }
});

//** UPDATE BLOG */
const updateBlog = asyncHandler(async (req, res) => {
  const { id } = req.params;
  // const { title, slug } = req.body;
  try {
    if (req.body.title) {
      req.body.slug = slugify(req.body.title.toLowerCase());
    }
    const updBlog = await blogModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json({
      status: true,
      message: "Blog Updated Successfully",
      updBlog,
    });
  } catch (error) {
    console.log(error);
  }
});

export { createBlog, getABlog, getAllBlog, deleteBlog, updateBlog };
