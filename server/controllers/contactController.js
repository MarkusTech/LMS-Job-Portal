import contactModel from "../models/contactModel.js";
import asyncHandler from "express-async-handler";
import validateMongoDbId from "../utils/validateMongoDbId.js";

const createContact = asyncHandler(async (req, res) => {
  try {
    const contact = await contactModel.create(req.body);
    res.status(200).json({
      status: true,
      message: "Contact Added Successfully",
      contact,
    });
  } catch (error) {
    console.log(error);
  }
});

const getAllContact = asyncHandler(async (req, res) => {
  try {
    const result = await contactModel.find();
    res.status(200).json({
      status: true,
      message: "Contacts Fetched",
      result,
    });
  } catch (error) {
    console.log(error);
  }
});

const getAContact = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const result = await contactModel.findById(id);
    res.status(200).json({
      status: true,
      message: "COntact Fetched",
      result,
    });
  } catch (error) {
    console.log(error);
  }
});

const deleteContact = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const deleterev = await contactModel.findByIdAndDelete(id);
    res.status(200).json({
      status: true,
      message: "Contact Deleted Successfully",
    });
  } catch (error) {
    console.log(error);
  }
});

const updateRContactStatus = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const result = await contactModel.findByIdAndUpdate(
      id,
      { status: req.body.status },
      { new: true }
    );
    res.status(200).json({
      status: true,
      message: "Contact Updated Successfully",
      result,
    });
  } catch (error) {
    console.log(error);
  }
});

export {
  createContact,
  getAllContact,
  getAContact,
  deleteContact,
  updateRContactStatus,
};
