import dotenv from "dotenv";
import { app } from "./app.js";

dotenv.config({
  path: "./.env",
});

import { connectDB } from "./config/connectionDB.js";

const PORT = 4000;

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running at port : ${PORT}`);
    })
  }).catch((err) => {
    console.log("Error connecting to database: ", err);
  })

