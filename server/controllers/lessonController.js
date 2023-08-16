import lessonModel from "../models/lessonModel.js";
import courseModel from "../models/courseModel.js";
import asyncHandler from "express-async-handler";
import validateMongoDbId from "../utils/validateMongoDbId.js";
import slugify from "slugify";

//** CREATE LESSON */
const createLesson = asyncHandler(async (req, res) => {
  const { courseId } = req.params;
  try {
    const findCourse = await courseModel.findById(courseId);
    if (findCourse) {
      if (req.body.title) {
        req.body.slug = slugify(req.body.title.toLowerCase());
      }
      const lesson = await lessonModel.create(req.body);
      await courseModel.findByIdAndUpdate(
        courseId,
        {
          $push: { lessons: lesson._id },
        },
        { new: true }
      );
      res.status(200).json({
        status: true,
        message: "Lesson Added to the Course!",
      });
    } else {
      throw new Error("No Course Exists with this ID");
    }
  } catch (error) {
    console.log(error);
  }
});

//** DELETE LESSON */
const deleteLesson = asyncHandler(async (req, res) => {
  const { courseId, lessonId } = req.params;
  validateMongoDbId(courseId);
  validateMongoDbId(lessonId);
  try {
    const findCourse = await courseModel.findByIdAndUpdate(
      courseId,
      { $pull: { lessons: lessonId } },
      { new: true }
    );
    const findlesson = await lessonModel.findByIdAndDelete(lessonId);
    res.status(200).json({
      status: true,
      message: "Lesson Deleted Successfully",
    });
  } catch (error) {
    throw new Error(error);
  }
});
//** GET LESSON */
const getLesson = asyncHandler(async (req, res) => {
  const { lessonId } = req.params;
  validateMongoDbId(lessonId);
  try {
    const lesson = await lessonModel.findOne({ lesson: lessonId });
    res.status(200).json({
      status: true,
      message: "lession found!",
      lesson,
    });
  } catch (error) {
    throw new Error(error);
  }
});

//** GET ALL LESSON */
const getAllLesson = asyncHandler(async (req, res) => {
  const { courseId } = req.params;
  validateMongoDbId(courseId);
  try {
    const lessons = await courseModel
      .find()
      .where({ _id: courseId })
      .select("lessons");
    res.status(200).json({ status: true, message: "lession found!", lessons });
  } catch (error) {
    throw new Error(error);
  }
});

//** UPDATE LESSON */
const updateLesson = asyncHandler(async (req, res) => {
  const { lessonId } = req.params;
  try {
    const lesson = await lessonModel.findByIdAndUpdate(lessonId, req.body, {
      new: true,
    });
    res.status(200).json({
      status: true,
      message: "lesson updated!",
      lesson,
    });
  } catch (error) {
    throw new Error(error);
  }
});

export { createLesson, deleteLesson, getLesson, getAllLesson, updateLesson };
