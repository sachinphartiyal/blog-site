import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// register controller
export const register = async (req, res) => {
  try {
    let image_filename = req.file ? req.file.filename : null;

    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ message: "All fields are required", success: false });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(409)
        .json({ message: "User already exists", success: false });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      image: image_filename,
    });

    user.password = undefined;

    res
      .status(201)
      .json({ message: "User created successfully", success: true, user });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", success: false });
  }
};

// login controller
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "All fields are required", success: false });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(401)
        .json({ message: "User not found", success: false });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ message: "Invalid email or password", success: false });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SCERECT, {
      expiresIn: "1d",
    });

    user.password = undefined;

    res
      .status(200)
      .json({ message: "Login successful", success: true, token, user });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", success: false });
  }
};
