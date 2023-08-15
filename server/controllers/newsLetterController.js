import newsLetterModel from "../models/newsLetterModel.js";
import asyncHandler from "express-async-handler";
import validateMongoDbId from "../utils/validateMongoDbId.js";

//** SUBSCRIBE */
const subscribe = asyncHandler(async (req, res) => {
  try {
    const newEmail = await newsLetterModel.create(req.body);
    res.status(200).json({
      status: true,
      message: "Subscribe to News Letter",
    });
  } catch (error) {
    console.log(error);
  }
});

//** UNSUBSCRIBE */
const unsubscribe = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const result = await newsLetterModel.findByIdAndDelete(id);
    res.status(200).json({
      status: true,
      message: "UnSubscribe To News Letter",
    });
  } catch (error) {
    console.log(error);
  }
});

export { subscribe, unsubscribe };
