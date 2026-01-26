import express from "express";
import { isAuthenticated } from "../middlewares/isAuthenticated.js";
import { upload } from "../middlewares/multer.js";

import {
  allBlogs,
  createBlog,
  deleteBlog,
  userBlogs,
  singleBlog,
  updateBlog,
} from "../controllers/blog.controller.js";

const router = express.Router();

router.post("/create", isAuthenticated, upload.single("image"), createBlog);
router.get("/all", allBlogs);
router.get("/:id", singleBlog);
router.put("/update/:id", isAuthenticated, upload.single("image"), updateBlog);
router.delete("/delete/:id", isAuthenticated, deleteBlog);
router.get("/user/blogs", isAuthenticated, userBlogs);

export default router;
