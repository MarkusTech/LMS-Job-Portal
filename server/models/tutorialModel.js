import mongoose from "mongoose";

const tutorialSchema = new mongoose.Schema({}, { timestamps: true });

export default mongoose.Model("Tutorial", tutorialSchema);
