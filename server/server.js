import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import session from "express-session";
import passport from "passport";
import colors from "colors";

//** IMPORT ROUTES */
import userRoutes from "./routes/userRoutes.js";
import googleRoutes from "./routes/googleRoutes.js";
import tutorialCategory from "./routes/tutorialCategoryRoutes.js";

//** MIDDLEWARE IMPORT */
import notFound from "./middlewares/errorHandler.js";
import errorMiddleware from "./middlewares/errorMiddleware.js";
import passportSetup from "./utils/passport.js";

//** DATABASE IMPORT */
import connectDB from "./config/db.js";
import MongoStore from "connect-mongo";

//** DOTENV CONFIG */
dotenv.config();
const port = process.env.PORT;

//** REST OBJECT */
const app = express();

//** MIDDLEWARE */
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: "ThatsMySecret",
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB,
      ttl: 12 * 60 * 60,
    }),
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));

//** API GET REQUEST */
app.get("/api", (req, res) => {
  res.send("Wenn Mark Recopelacion");
});
app.get("/", (req, res) => {
  res.send(`<a href="http://localhost:5000/google">Login With Google</a>`);
});

//** ROUTES API */
app.use("/api/v1", userRoutes);
app.use("/", googleRoutes);
app.use("/api/v1/tutorial/category", tutorialCategory);

// ** VALIDATION MIDDLEWARE *
app.use(notFound);
app.use(errorMiddleware);

//** DATABASE */
connectDB();

//** LISTENER */
app.listen(port, () => {
  console.log(`Sever is running on http://localhost:${port}`.bgCyan);
});
