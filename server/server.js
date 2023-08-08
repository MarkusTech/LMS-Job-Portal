import express from "express";
import cors from "cors";

// DOTENV CONFIG
const port = 5000;

//** REST OBJECT */
const app = express();

//** MIDDLEWARE */
app.use(express.json());
app.use(cors);

//** LISTENER */
app.listen(port, () => {
  console.log(`Sever is running on http://localhost:${port}`);
});
