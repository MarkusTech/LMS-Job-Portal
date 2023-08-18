import sesssionModel from "../models/sesssionModel";
import { createOne, updateOne, deleteOne, getOne, getAll } from "./customController.js"

const postSession = createOne(BookSession);
const updateSession = updateOne(BookSession);
const deleteSession = deleteOne(BookSession);
const getASession = getOne(BookSession);
const getAllSession = getAll(BookSession);

export {
  postSession,
  updateSession,
  deleteSession,
  getASession,
  getAllSession,
};
