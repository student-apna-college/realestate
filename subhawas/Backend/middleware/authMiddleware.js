import jwt from "jsonwebtoken";
import User from "../models/User.js"; // adjust the path if needed


export const protect = async (req, res, next) => {
  const token = req.cookies.jwt;

  if (!token) {
    return res.status(401).json({ message: "Not authenticated" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select("-password");
    next(); // ✅ must call next()
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

export const authOptional = async (req, res, next) => {
  const token = req.cookies.jwt;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select("-password");
    } catch (error) {
      req.user = null;
    }
  }
  next();
};

// middleware/authOptional.js
