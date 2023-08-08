import express from "express";

// DOTENV CONFIG
const port = 5000;

//** REST OBJECT */
const app = express();

//** MIDDLEWARE */
app.use(express.json());

//** LISTENER */
app.listen(port, () => {
  console.log(`Sever is running on http://localhost:${port}`);
});
