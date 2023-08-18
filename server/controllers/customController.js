import asyncHandler from "express-async-handler";
import slugify from "slugify";
import validateMongoDbId from "../utils/validateMongoDbId.js";
import query from "express";
import APIFeatures from "../utils/apiFeatures.js";


const createOne = (Model) => {
  return asyncHandler(async (req, res) => {
    try {
      if (req.body.title) {
        req.body.slug = slugify(req.body.title.toLowerCase());
      }
      const data = await Model.create(req.body);
      res.status(200).json({ status: true, message: "Created Succses!" });
    } catch (error) {
      throw new Error(error);
    }
  });
};

const updateOne = (Model) => {
  return asyncHandler(async (req, res) => {
    const { id } = req.params;

    validateMongodbId(id);
    try {
      if (req.body.title) {
        req.body.slug = slugify(req.body.title.toLowerCase());
      }
      console.log(id);
      const data = await Model.findByIdAndUpdate(id, req.body, { new: true });
      res.status(200).json({ status: true, message: "Updated Succses!", data });
    } catch (error) {
      throw new Error(error);
    }
  });
};

const deleteOne = (Model) => {
  return asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongodbId(id);
    try {
      const data = await Model.findByIdAndDelete(id);
      res.status(200).json({ status: true, message: "Deleted Succses!" });
    } catch (error) {
      throw new Error(error);
    }
  });
};

const getOne = (Model, populateOptions) => {
  return asyncHandler(async (req, res) => {
    const { id, slug } = req.params;

    if (id) validateMongodbId(id);
    try {
      let query;
      if (id) {
        query = Model.findById(id);
      }
      if (slug) {
        query = Model.findOne({ slug: slug });
      }
      if (populateOptions) query = query.populate(populateOptions);

      const data = await query;

      res.status(200).json({ status: true, message: "Fetch Succses!", data });
    } catch (error) {
      throw new Error(error);
    }
  });
};

const getAll = (Model, populateOptions) => {
  return asyncHandler(async (req, res) => {
    try {
      let filter = {};
      let features = new APIFeatures(Model.find(filter), req.query)
        .filter()
        .sort()
        .limitFields()
        .paginate();
      let query1;

      if (populateOptions) {
        query1 = features.query.populate(populateOptions);
      } else {
        query1 = features.query;
      }
      let data = await query1;
      res.status(200).json({ status: true, message: "Fetch Succses!", data });
    } catch (error) {
      throw new Error(error);
    }
  });
};

export { createOne, updateOne, deleteOne, getOne, getAll }
