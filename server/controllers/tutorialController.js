import slugify from "slugify";
import tutorialModel from "../models/tutorialModel.js";
import asyncHandler from "express-async-handler";

//** CREATE TUTORIAL */
const createTutorial = asyncHandler(async (req, res) => {
  try {
    if (req.body.title) {
      req.body.slug = slugify(req.body.title.toLowerCase());
    }
    if (req.body.tutorialCategory) {
      req.body.tutorialCategorySlug = slugify(
        req.body.tutorialCategory.toLowerCase()
      );
    }
  } catch (error) {
    console.log(error);
  }
});

export { createTutorial };
