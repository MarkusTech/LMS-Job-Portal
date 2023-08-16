import mongoose from "mongoose";

const courseCatSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      require: true,
      unique: true,
    },
    slug: {
      type: String,
      require: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("CourseCategory", courseCatSchema);
