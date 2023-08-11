import mongoose from "mongoose";

const newsLetterSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

//Export the model
export default mongoose.model("NewsLetter", newsLetterSchema);
