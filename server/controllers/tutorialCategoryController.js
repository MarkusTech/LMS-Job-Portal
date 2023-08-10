import tutCategoryModel from "../models/tutCategoryModel.js";
import asyncHandler from "express-async-handler";
import slugify from "slugify";

const postTutorialCategory = asyncHandler(async (req, res) => {
  try {
    if (req.body.title) {
      req.body.slug = slugify(req.body.title.toLowerCase());
    }
    const postTutCat = await tutCategoryModel.create(req.body);
    res.status(200).json({
      status: true,
      message: "Tutorial Category Created Successfully!",
    });
  } catch (error) {
    console.log(error);
  }
});

const books = asyncHandler(async (req, res) => {
  res.send("books");
});

export { postTutorialCategory, books };
