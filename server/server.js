import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import colors from "colors";

//** DATABASE IMPORT */
import connectDB from "./config/db.js";

//** DOTENV CONFIG */
dotenv.config();
const port = process.env.PORT;

//** REST OBJECT */
const app = express();

//** MIDDLEWARE */
app.use(express.json());
app.use(cors);
app.use(bodyParser.urlencoded({ extended: true }));

//** API GET REQUEST */
app.get("/", (req, res) => {
  res.send("Wenn Mark Recopelacion");
});

//** DATABASE */
connectDB();

//** LISTENER */
app.listen(port, () => {
  console.log(`Sever is running on http://localhost:${port}`.bgCyan);
});
