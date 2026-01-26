import express from "express";
import cors from "cors";

const app = express();  // Initializes the Express application

// middlewares
app.use(cors());
app.use(express.json());

// routes import
import userRoutes from "./routes/user.routes.js";
import blogRoutes from "./routes/blog.routes.js";

// routes declaration
app.use("/images", express.static("uploads"));
app.use("/user", userRoutes);
app.use("/blog", blogRoutes);

export { app };

/*
Use app.get() when defining routes directly in the main file; 
Use app.use() when connecting external route files (routers).
*/