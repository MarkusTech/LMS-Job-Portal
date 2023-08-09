import mongoose from "mongoose";
const validateMongoDbId = (id) => {
  const isvalid = mongoose.Types.ObjectId.isValid(id);
  if (!isvalid) {
    throw new Error("This Id is not valid or Not found.");
  }
};

export default validateMongoDbId;
