import asyncHandler from "express-async-handler";

const createContact = asyncHandler(async (req, res) => {
  res.send("Hello World!");
});

export { createContact };
