import mongoose from "mongoose";

// Declare the Schema of the Mongo model
const contactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      index: true,
    },
    email: {
      type: String,
      required: true,
    },
    mobile: {
      type: String,
      required: true,
    },
    subject: {
      type: String,
      required: true,
    },
    profession: {
      ype: String,
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: "Submitted",
    },
  },
  { timestamps: true }
);

//Export the model
export default mongoose.model("Contact", contactSchema);
