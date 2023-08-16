import courseModel from "../models/courseModel.js";
import asyncHandler from "express-async-handler";
import validateMongoDbId from "../utils/validateMongoDbId.js";
import slugify from "slugify";
import userModel from "../models/userModel.js";

//** CREATE COURSE */
const createCourse = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  validateMongoDbId(id);
  try {
    if (req.body.title) {
      req.body.slug = slugify(req.body.title.toLowerCase());
    }
    if (_id) {
      req.body.instructor = _id;
    }
    const course = await courseModel.create(req.body);
    res.status(200).json({
      status: true,
      message: "Course Created Successfully",
    });
  } catch (error) {
    console.log(error);
  }
});

//** GET ALL COURSE */
const getAllCourse = asyncHandler(async (req, res) => {
  try {
    const result = await courseModel.find();
    res.status(200).json({
      status: true,
      message: "All Courses Fetched!",
      result,
    });
  } catch (error) {
    console.log(object);
  }
});

//** GET COURSE */
const getCourse = asyncHandler(async (req, res) => {
  const { slug } = req.params;
  try {
    const result = await courseModel.findOne({ slug });
    res.status(200).json({
      status: true,
      message: "Course Fetched",
      result,
    });
  } catch (error) {
    console.log(error);
  }
});

//** GET PARTICULAR COURSE INSTRUCTOR */
const getParticularInstructorCourse = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  console.log(req.user);
  validateMongoDbId(_id);
  try {
    const course = await courseModel.find({ instructor: _id });
    res.status(200).json({
      status: true,
      message: "Course Found!",
      course,
    });
  } catch (error) {
    console.log(error);
  }
});

//** UPDATE COURSE */
const updateCourse = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const updateCour = await courseModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json({
      status: true,
      message: "Course Updated!",
      updateCour,
    });
  } catch (error) {
    console.log(error);
  }
});
//** DELETE COURSE */
const deleteCourse = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const delCourse = await courseModel.findByIdAndDelete(id);
    res.status(200).json({
      status: true,
      message: "Course Deleted Successfully!",
    });
  } catch (error) {
    console.log(error);
  }
});
//** CHECK ENROLLMENT */
const checkEnrollment = asyncHandler(async (req, res) => {
  const { courseId } = req.params;
  const { id } = req.user;
  const user = await userModel.findById(id);
  let ids = [];
  for (let i = 0; i < user.courses.length; i++) {
    if (user.courses.length > 0) {
      ids.push(user.courses[index].toString());
    }
  }
  res.status(200).json({
    status: ids.includes(courseId),
    course: await Course.findById(courseId).exec(),
  });
});

//** FREE ENROLLMENT */
const freeEnrollment = asyncHandler(async (req, res) => {
  try {
    const course = await courseModel.findById(req.params.courseId);
    if (course.paid) {
      return;
    }
    const addCourseToUser = await userModel.findByIdAndUpdate(
      req.user.id,
      {
        $push: { courses: course?._id },
      },
      { new: true }
    );
  } catch (error) {
    console.log(error);
  }
});

export {
  createCourse,
  getAllCourse,
  getCourse,
  getParticularInstructorCourse,
  updateCourse,
  deleteCourse,
  checkEnrollment,
  freeEnrollment,
};
