import mongoose from "mongoose";

// Declare the Schema of the Mongo model
const ReviewSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    comment: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
    isApproved: {
        type: Boolean,
        default: false,
    }
  },
  { timestamps: true }
);

//Export the model
export default mongoose.model("Review", ReviewSchema);
