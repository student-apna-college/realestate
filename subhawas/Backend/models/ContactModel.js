import mongoose from "mongoose";

const ContactModel = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  yourmessage: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("contact", ContactModel);
