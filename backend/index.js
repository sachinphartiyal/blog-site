import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import { connectDB } from "./config/connectionDB.js";
import userRoutes from "./routes/user.routes.js";
import blogRoutes from "./routes/blog.routes.js";

dotenv.config(); //Reads variables from .env file
const app = express(); // Initializes the Express application

// middlewares
app.use(express.json()); // Converts incoming JSON request data into req.body
app.use(cors()); // Enables Cross-Origin Resource Sharing

// API ENDPOINTS
app.use("/images", express.static("uploads")); // Serves static files from the "uploads" directory

app.use("/user", userRoutes);
app.use("/blog", blogRoutes);

const PORT = 4000;
app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on port ${PORT}`);
});
