import { truncates } from "bcryptjs";
import ContactModel from "../models/ContactModel.js"; // add .js if you use ES modules

export const contactController = async (req, res) => {
  try {
    const { name, email, phone, yourmessage } = req.body;

    if (!name || !email || !phone || !yourmessage) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const savedContact = await ContactModel.create({
      name,
      email,
      phone,
      yourmessage,
    });

    return res.status(201).json({
      message: "Contact message saved successfully",
      data: savedContact,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error. Please try again later." });
  }
};



export const getallcontact = async (req, res) => {
    try {
        const getcontact = await ContactModel.find().sort({ createdAt: -1 });
        res.status(200).json(getcontact);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error" });
    }
};
