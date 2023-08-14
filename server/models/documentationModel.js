import mongoose from "mongoose";

const documentationSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      default: "WMR.ORG",
    },
    content: {
      type: String,
      required: true,
    },
    keywords: {
      type: [],
      required: true,
    },
    doc_image: {
      type: String,
      defaul:
        "https://cdn.vectorstock.com/i/preview-1x/65/30/default-image-icon-missing-picture-page-vector-40546530.jpg",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Documentation", documentationSchema);
