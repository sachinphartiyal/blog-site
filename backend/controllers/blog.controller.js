import Blog from "../models/blog.model.js";
// node.js module -> used to delete blog images from server
import fs from "fs";

// get all blogs
export const allBlogs = async (req, res) => {
  try {
    // createdAt: -1 → descending order (newest first)
    const blogs = await Blog.find({}).sort({ createdAt: -1 });
    return res
      .status(200)
      .json({ blogs, success: true, message: "Blogs fetched successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error in fetching all blogs", success: false });
  }
};

// create blog
export const createBlog = async (req, res) => {
  try {
    const { title, category, description } = req.body;
    const image_filename = req.file?.filename;   //`${req.file.filename}`;

    const blog = await Blog.create({
      title,
      category,
      description,
      image: image_filename,
      author: {
        id: req.user._id,
        name: req.user.name,
        image: req.user.image,
      },
    });

    return res
      .status(201)
      .json({ message: "Blog created successfully", success: true, blog });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error in creating blog", success: false });
  }
};

// delete blog
export const deleteBlog = async (req, res) => {
  const blog = await Blog.findById(req.params.id);

  if (!blog) {
    return res
      .status(404)
      .json({ message: "Blog not found", success: false });
  }

  fs.unlink(`uploads/${blog.image}`, () => { });

  // authorization check
  if (blog.author.id.toString() !== req.user.id.toString()) {
    return res
      .status(403)
      .json({ message: "Not authorized to delete this blog", success: false });
  }

  await blog.deleteOne();

  return res
    .status(200)
    .json({ message: "Blog deleted successfully", success: true });
};

// get single blog
export const singleBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    return res
      .status(200)
      .json({ message: "Blog found", success: true, blog });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error in fetching blog", success: false });
  }
};

// get user blogs
export const userBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({ "author.id": req.user._id }).sort({
      createdAt: -1,
    });

    res.status(200).json({ blogs, success: true, message: "User blogs fetched successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "User blogs cannot be fetched", success: false });
  }
};

// update blog
export const updateBlog = async (req, res) => {
  try {
    const { title, category, description } = req.body;

    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res
        .status(404)
        .json({ message: "Blog not found", success: false });
    }

    // Authorization check - only author can edit
    if (blog.author.id.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ message: "Not authorized to edit this blog", success: false });
    }

    // Update fields
    blog.title = title || blog.title;
    blog.category = category || blog.category;
    blog.description = description || blog.description;

    // Handle image update if new image is provided
    if (req.file?.filename) {
      if (blog.image) {
        fs.unlink(`uploads/${blog.image}`, (err) => {
          if (err) {
            console.error("Error deleting old image: ", err.message);
          }
        });
      }

      // Set new image
      blog.image = req.file.filename;
    }

    await blog.save();

    return res
      .status(200)
      .json({ message: "Blog updated successfully", success: true, blog });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error in updating blog", success: false });
  }
};

