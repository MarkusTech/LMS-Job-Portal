import asyncHandler from "express-async-handler";

const createContact = asyncHandler(async (req, res) => {
  res.send("Hello World!");
});

const getAllContact = async (req, res) => {
  res.send("Get All Contact");
};

export { createContact };
