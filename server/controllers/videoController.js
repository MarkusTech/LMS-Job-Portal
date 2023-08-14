import videoModel from "../models/videoModel.js";
import asyncHandler from "express-async-handler";
import validateMongoDbId from "../utils/validateMongoDbId.js";
import slugify from "slugify";

//** Create post video */
const videoController = asyncHandler(async (req, res) => {
  try {
    if (req.body.title) {
      req.body.slug = slugify(req.body.title.toLowerCase());
    }
    const video = await videoModel.create(req.body);
    res.status(200).json({
      status: true,
      message: "Video Posted Successfully",
    });
  } catch (error) {
    console.log(error);
  }
});

//** Get A Video */
const getVideo = asyncHandler(async (req, res) => {
  const { slug } = req.params;
  try {
    const result = await videoModel.findOne({ slug });
    res.status(200).json({
      status: true,
      message: "Video Found!",
      result,
    });
  } catch (error) {
    console.log(error);
  }
});

//** GET ALL VIDEO */
const getAllVideo = asyncHandler(async (req, res) => {
  try {
    const result = await videoModel.find();
    res.status(200).json({
      status: true,
      message: "Videos Fetched",
      result,
    });
  } catch (error) {
    console.log(error);
  }
});

//** DELETE VIDEO */
const deleteVideo = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const deleteVid = await videoModel.findByIdAndDelete(id);
    res.status(200).json({
      status: true,
      message: "Video Deleted Successfully",
    });
  } catch (error) {
    console.log(error);
  }
});

//** UPDATE VIDEO */
const updateVideo = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    if (req.body.title) {
      req.body.slug = slugify(req.body.title.toLowerCase());
    }
    const updateVid = await videoModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json({
      status: true,
      message: "Video Updated Successfully",
    });
  } catch (error) {
    console.log(error);
  }
});

export { videoController, getVideo, getAllVideo, deleteVideo, updateVideo };
