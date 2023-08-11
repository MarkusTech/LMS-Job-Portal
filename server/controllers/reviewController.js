import reviewModel from "../models/reviewModel.js";
import userModel from "../models/userModel.js";
import asyncHandler from "express-async-handler";
import validateMongoDbId from "../utils/validateMongoDbId.js";

const createReview = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  validateMongoDbId(_id);
  try {
    let data = {
      user: _id,
      comment: req.body.comment,
      color: req.body.color,
    };
    const review = await reviewModel.create(data);
    res.status(200).json({
      status: true,
      message: "Review Added Successfully",
      review,
    });
  } catch (error) {
    console.log(error);
  }
});

const getAllReviews = asyncHandler(async (req, res) => {
  try {
    const result = await reviewModel.find();
    res.status(200).json({
      status: true,
      message: "Reviews Fetched",
      result,
    });
  } catch (error) {
    console.log(error);
  }
});

const getAReview = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const result = await reviewModel.findById(id);
    res.status(200).json({
      status: true,
      message: "Review Fetched",
      result,
    });
  } catch (error) {
    console.log(error);
  }
});

const deleteReview = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const deleterev = await reviewModel.findByIdAndDelete(id);
    res.status(200).json({
      status: true,
      message: "Review Deleted Successfully",
    });
  } catch (error) {
    console.log(error);
  }
});

const updateReviewStatus = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const result = await reviewModel.findByIdAndUpdate(
      id,
      { isApproved: req.body.isApproved },
      { new: true }
    );
    res.status(200).json({
      status: true,
      message: "Review Updated Successfully",
      result,
    });
  } catch (error) {
    console.log(error);
  }
});

export {
  createReview,
  getAllReviews,
  getAReview,
  deleteReview,
  updateReviewStatus,
};
