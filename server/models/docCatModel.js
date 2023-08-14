import mongoose from "mongoose";

const docCatSchema = new mongoose.Schema({}, { timestamps: true });

export default mongoose.model("DocCategory", docCatSchema);
