import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

/*
JWT authentication middleware: If user ke pass valid token hai toh i will add req.user field in request.
*/

export const isAuthenticated = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer")) {
      return res.status(401).json({ message: "Token is not present" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SCERECT);

    const user = await User.findById(decoded?.id).select("-password");

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    // req.user now available for next middleware or controller
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};
