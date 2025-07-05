import User from "../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import Shop from "../models/Company.js";
import Property from "../models/Property.js";

export const register = async (req, res) => {
  try {
    const { name, email, password, phone, role } = req.body;

    // 1. Validate required fields
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // 2. Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: 'Email already registered' });
    }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    phone,
    role: role || "user",
  });
  res.status(201).json(user);
}catch(error){

  console.log(error, "error while ragister")

}}

export const login = async (req, res) => {
  const { email, password } = req.body;

  if(!email || !password){
    return res.status(400).json({message:"all fields are important"})
  }
  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    const token = jwt.sign(
      { id: user._id, name: user.name, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.cookie("jwt", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    res.json({ success: true, role: user.role });
  } else {
    res.status(401).json({ message: "Invalid credentials" });
  }
};

export const getMe = async (req, res) => {
  res.json({
    
    _id: req.user._id,
    name: req.user.name,
    email: req.user.email,
    role: req.user.role,
  });
};

export const getAdminCompanyDetails = async (req, res) => {
  const adminId = req.params.adminId;

  const admin = await User.findById(adminId).select("name email");
  const shop = await Shop.findOne({ admin: adminId }).select("name image");

  if (!admin || !shop) {
    return res.status(404).json({ message: "Admin or shop not found" });
  }

  const products = await Property.find({ shopId: shop._id }).select(
    "name price"
  );

  res.json({
    admin,
    shop: {
      _id: shop._id, // ✅ ADD THIS LINE
      name: shop.name,
      image: shop.image,
      products,
    },
  });
};

// routes/auth.js or wherever your auth routes are
export const logout = (req, res) => {
  res.clearCookie("jwt", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "Strict",
  });
  res.json({ message: "Logged out" });
};
