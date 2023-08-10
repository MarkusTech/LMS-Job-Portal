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
    const createTutorial = await tutorialModel.create(req.body);
    res.status(200).json({
      status: true,
      message: "Tutorial Created Successfully!",
      createTutorial,
    });
  } catch (error) {
    console.log(error);
  }
});

const getAllTutorials = asyncHandler(async (req, res) => {
  res.send("Get All tutorials");
});

export { createTutorial, getAllTutorials };
