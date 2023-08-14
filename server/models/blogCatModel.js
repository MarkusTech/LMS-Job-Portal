import mongoose from "mongoose";

const blogCatSchema = new mongoose.Schema(
  {},
  {
    timestamps: true,
  }
);

export default mongoose.model("BlogCategory", blogCatSchema);
