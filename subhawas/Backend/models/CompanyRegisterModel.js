import mongoose from "mongoose";

const CompanyRegisterModel = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  pan: { type: String, required: true },
  address: { type: String, required: true },
  categoryofshop: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("CompanyRegisterForm", CompanyRegisterModel);
