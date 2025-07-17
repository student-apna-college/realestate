import Company from "../models/Company.js";
import Property from "../models/Property.js";

// ✅ Create Shop (SuperAdmin only)
export const createCompany = async (req, res) => {
  try {
    let { name, admin, address, phone, gstnumber, pan, website } = req.body;
    const image = req.file?.filename;

    // Clean admin if sent as a quoted string
    if (typeof admin === "string") {
      admin = admin.replace(/^"(.*)"$/, "$1");
    }

    // Validate required fields based on schema: name, admin, image
    if (!admin || !name || !image) {
      return res.status(400).json({
        message: "Name, Admin, and Image are required.",
      });
    }

    const company = await Company.create({
      name,
      admin,
      image,
      address,   // nested object expected by your schema
      phone,
      gstnumber,
      pan,
      website,
    });

    console.log("✅ Created company:", company);
    res.status(201).json(company);
  } catch (error) {
    console.error("❌ Error while creating company:", error);
    res.status(500).json({ message: error?.description || error.message });
  }
};

// ✅ Get All Shops (Admin sees their shops, others see all)
export const getAllCompany = async (req, res) => {
  try {
    let companys;

    if (req.user && req.user.role === "admin") {
      companys = await Company.find({ admin: req.user._id }).populate("admin", "name");
    } else {
      companys = await Company.find().populate("admin", "name");
    }

    console.log("Found companies:", companys.length);

    const shopsWithProducts = await Promise.all(
      companys.map(async (company) => {
        try {
          console.log("Processing company:", company.name, company._id);
          const products = await Property.find({ companyId: company._id }).select("name price image");
          return {
            ...company._doc,
            products,
            category: company.category,
            createdAt: company.createdAt,
          };
        } catch (innerErr) {
          console.error(`❌ Failed to fetch properties for company ${company.name} (${company._id}):`, innerErr);
          return {
            ...company._doc,
            products: [],
            category: company.category,
            createdAt: company.createdAt,
          };
        }
      })
    );

    res.json(shopsWithProducts);
  } catch (error) {
    console.error("❌ REAL ERROR IN getAllCompany:", error);
    res.status(500).json({ message: "Server error" });
  }
};


// ✅ Update Shop (SuperAdmin or Shop Admin)
export const updateCompany = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, category, location } = req.body;
    const image = req.file?.filename;

    const shop = await Company.findById(id);
    if (!shop) {
      return res.status(404).json({ message: "Shop not found" });
    }

    // Optional: Only allow admins of the shop or superadmin
    if (
      req.user.role !== "superadmin" &&
      shop.admin.toString() !== req.user._id.toString()
    ) {
      return res
        .status(403)
        .json({ message: "Unauthorized to update this shop" });
    }

    // Update fields
    if (name) shop.name = name;
    if (category) shop.category = category;
    if (location) shop.location = location;

    if (image) shop.image = image;

    await shop.save();
    res.json({ message: "Shop updated successfully", shop });
  } catch (error) {
    console.error("❌ Error updating shop:", error);
    res.status(500).json({ message: "Server error" });
  }
};



// ✅ Delete Shop (SuperAdmin or Shop Admin)
export const deleteCompany = async (req, res) => {
  try {
    const { id } = req.params;

    const shop = await Company.findById(id);
    if (!shop) {
      return res.status(404).json({ message: "Shop not found" });
    }

    // Optional: Only allow admins of the shop or superadmin
    if (
      req.user.role !== "superadmin" &&
      shop.admin.toString() !== req.user._id.toString()
    ) {
      return res
        .status(403)
        .json({ message: "Unauthorized to delete this shop" });
    }

    await shop.deleteOne();
    res.json({ message: "Shop deleted successfully" });
  } catch (error) {
    console.error("❌ Error deleting shop:", error);
    res.status(500).json({ message: "Server error" });
  }
};
