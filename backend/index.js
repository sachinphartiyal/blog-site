import dotenv from "dotenv";
import { app } from "./app.js";

dotenv.config({
  path: "./.env",
});

import { connectDB } from "./config/connectionDB.js";

const PORT = 4000;

// Server connection
connectDB()
  .then(() => {
    // start the server
    app.listen(PORT, () => {
      console.log(`Server is running at port : ${PORT}`);
    })
  })

