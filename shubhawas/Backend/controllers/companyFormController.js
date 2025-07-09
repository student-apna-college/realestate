import CompanyRegisterModel from "../models/CompanyRegisterModel.js";

export const companyFormController = async (req, res) => {
  try {
    const { name, email, phone, pan, address, categoryofshop } = req.body;

    if (!name || !email || !phone || !pan || !address || !categoryofshop) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const submittedForm = await CompanyRegisterModel.create({
      name,
      email,
      phone,
      pan,
      address,
      categoryofshop,
    });

    console.log("✅ Form submitted:", submittedForm);
    res.status(201).json(submittedForm);
  } catch (error) {
    console.error("❌ Error while form submit:", error);
    res.status(500).json({
      success: false,
      message: "Error while form submit",
    });
  }
};




export const getCompanyFormQuery = async (req, res) => {
  try {
    const shopQueries = await CompanyRegisterModel.find().sort({ createdAt: -1 });
    res.status(200).json(shopQueries);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};