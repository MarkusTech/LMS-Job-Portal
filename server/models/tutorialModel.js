import mongoose from "mongoose";

const tutorialSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    slug: {
      required: true,
      type: String,
      unique: true,
      index: true,
    },
    tutorialCategory: {
      type: String,
      required: true,
    },
    tutorialCategorySlug: {
      type: String,
      required: true,
    },
    topicName: {
      required: true,
      unique: true,
      type: String,
    },
    content: {
      required: true,
      type: String,
    },
    keywords: {
      type: [],
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.Model("Tutorial", tutorialSchema);
