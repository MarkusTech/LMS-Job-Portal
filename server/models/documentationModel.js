import mongoose from "mongoose";

const documentationSchema = new mongoose.Schema({}, { timestamps: true });

export default mongoose.model("Documentation", documentationSchema);
