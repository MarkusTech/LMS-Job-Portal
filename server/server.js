import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import colors from "colors";

//** IMPORT ROUTES */
import userRoutes from "./routes/userRoutes.js";

//** MIDDLEWARE IMPORT */
import notFound from "./middlewares/errorHandler.js";
import errorMiddleware from "./middlewares/errorMiddleware.js";

//** DATABASE IMPORT */
import connectDB from "./config/db.js";

//** DOTENV CONFIG */
dotenv.config();
const port = process.env.PORT;

//** REST OBJECT */
const app = express();

//** MIDDLEWARE */
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));

//** API GET REQUEST */
app.get("/", (req, res) => {
  res.send("Wenn Mark Recopelacion");
});

//** ROUTES API */
app.use("/api/v1", userRoutes);

// ** VALIDATION MIDDLEWARE *
app.use(notFound);
app.use(errorMiddleware);

//** DATABASE */
connectDB();

//** LISTENER */
app.listen(port, () => {
  console.log(`Sever is running on http://localhost:${port}`.bgCyan);
});
