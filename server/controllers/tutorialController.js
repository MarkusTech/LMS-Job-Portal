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

//** GET ALL TUTORIALS */
const getAllTutorials = asyncHandler(async (req, res) => {
  try {
    const result = await tutorialModel.find();
    res.status(200).json({
      status: true,
      message: "Tutorial Fetched Successfully",
      result,
    });
  } catch (error) {
    console.log(error);
  }
});

//** GET SINGLE TUTORIAL */
const getATutorial = asyncHandler(async (req, res) => {
  const { slug, type } = req.params;
  try {
    const result = await tutorialModel.findOne({
      slug: slug,
      tutorialCategorySlug: type,
    });
    const tutorialTopics = await tutorialModel
      .find({
        tutorialCategorySlug: type,
      })
      .select("topicName title slug tutorialCategorySlug")
      .sort("createdAt");
    res.status(200).json({
      status: true,
      message: "Data Fetched!",
      result,
      tutorialTopics,
    });
  } catch (error) {
    console.log(error);
  }
});

export { createTutorial, getAllTutorials, getATutorial };
