// import Product from "../models/Product.js";
// import Shop from "../models/Shop.js";

// // ✅ Create Product
// export const createProperty = async (req, res) => {
//   try {
//     const {
//       name,
//       description,
//       price,
//       shopId,
//       category,
//       subCategory,
//       quantity,
//       unit,
//     } = req.body;
//     const image = req.file?.filename;

//     if (!name || !price || !shopId || !category || !unit || !image) {
//       return res.status(400).json({ message: "Required fields missing" });
//     }

//     const product = await Product.create({
//       name,
//       description,
//       price,
//       shopId,
//       image,
//       category,
//       subCategory,
//       quantity,
//       unit,
//     });

//     const shop = await Shop.findById(shopId).select("name image");
//     res.status(201).json({ shop, product });
//   } catch (error) {
//     console.error("❌ Create error:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// };

// // ✅ Get All Products by Shop
// export const getProductsByShop = async (req, res) => {
//   try {
//     const products = await Product.find({ shopId: req.params.shopId }).populate(
//       "shopId",
//       "name image"
//     );
//     res.json(products);
//   } catch (error) {
//     console.error("❌ Fetch error:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// };

// // ✅ Get Single Product
// export const getProductById = async (req, res) => {
//   try {
//     const product = await Product.findById(req.params.id).populate(
//       "shopId",
//       "name"
//     );
//     if (!product) return res.status(404).json({ message: "Product not found" });
//     res.json(product);
//   } catch (error) {
//     console.error("❌ Get one error:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// };

// // ✅ Update Product
// export const updateProduct = async (req, res) => {
//   try {
//     const { name, description, price, category, subCategory, quantity, unit } =
//       req.body;
//     const image = req.file?.filename;

//     const product = await Product.findById(req.params.id);
//     if (!product) return res.status(404).json({ message: "Product not found" });

//     product.name = name || product.name;
//     product.description = description || product.description;
//     product.price = price || product.price;
//     product.category = category || product.category;
//     product.subCategory = subCategory || product.subCategory;
//     product.quantity = quantity || product.quantity;
//     product.unit = unit || product.unit;
//     if (image) product.image = image;

//     await product.save();
//     res.json({ message: "Product updated", product });
//   } catch (error) {
//     console.error("❌ Update error:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// };

// // ✅ Delete Product
// export const deleteProduct = async (req, res) => {
//   try {
//     const product = await Product.findByIdAndDelete(req.params.id);
//     if (!product) return res.status(404).json({ message: "Product not found" });
//     res.json({ message: "Product deleted successfully" });
//   } catch (error) {
//     console.error("❌ Delete error:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// };




import Property from "../models/Property.js";
import User from "../models/User.js"; // Assuming you have a User model for owner

// ✅ Create Property
export const createProperty = async (req, res) => {
  try {
    const {
      title,
      description,
      propertyType,
      purpose,
      price,
      maintenance,
      area,
      bedrooms,
      bathrooms,
      balconies,
      furnishing,
      parking,
      amenities,        // send as JSON array or comma-separated string
      address,
      locality,
      city,
      state,
      country,
      pincode,
      lat,
      lng,
      projectName,
      reraId,
      availableFrom,
      companyId,            // owner user ID
    } = req.body;

     const images = req.files.map(file => ({
      url: `uploads/property/${file.filename}`,
      alt: req.body.title || 'Property Image',
    }));

    const newProperty = new Property({
      ...req.body,
      images,
      companyId: req.user.companyId,
    });

    if (
      !title ||
      !description ||
      !propertyType ||
      !purpose ||
      !price ||
      !area ||
      !address ||
      !city ||
      !state ||
      !companyId
    ) {
      return res.status(400).json({ message: "Required fields missing" });
    }

    const property = await Property.create({
      title,
      description,
      propertyType,
      purpose,
      price,
      maintenance,
      area,
      bedrooms,
      bathrooms,
      balconies,
      furnishing,
      parking,
      amenities: Array.isArray(amenities) ? amenities : amenities?.split(","),
      images,
      location: {
        address,
        locality,
        city,
        state,
        country: country || "India",
        pincode,
        coordinates: { lat, lng },
      },
      projectName,
      reraId,
      availableFrom,
      companyId,
    });

    const companyInfo = await User.findById(companyId).select("name email");

    res.status(201).json({ property, companyId: companyInfo });
  } catch (error) {
    console.error("❌ Create Property error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Get All Properties
export const getAllProperties = async (req, res) => {
  try {
    const properties = await Property.find()
      .populate("companyId", "name email") // <-- FIXED: match field name
      .sort({ listedDate: -1 });
    res.json(properties);
  } catch (error) {
    console.error("❌ Fetch all properties error:", error);
    res.status(500).json({ message: "Server error" });
  }
};


// ✅ Get Single Property
export const getPropertyById = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id).populate("owner", "name email");
    if (!property) return res.status(404).json({ message: "Property not found" });
    res.json(property);
  } catch (error) {
    console.error("❌ Get property error:", error);
    res.status(500).json({ message: "Server error" });
  }
};






// controllers/propertyController.js
export const getPropertiesByCompany = async (req, res) => {
  try {
    const companyId = req.params.companyId;
    const properties = await Property.find({ companyId })
      .populate("companyId", "name email")
      .sort({ listedDate: -1 });
    res.json(properties);
  } catch (error) {
    console.error("❌ Fetch company properties error:", error);
    res.status(500).json({ message: "Server error" });
  }
};



// ✅ Update Property
export const updateProperty = async (req, res) => {
  try {
    const updates = req.body;

    if (req.files?.length > 0) {
      updates.images = req.files.map((file) => ({
        url: `/uploads/${file.filename}`,
        alt: updates.title || "Property image",
      }));
    }

    if (updates.amenities) {
      updates.amenities = Array.isArray(updates.amenities)
        ? updates.amenities
        : updates.amenities.split(",");
    }

    if (
      updates.lat !== undefined ||
      updates.lng !== undefined ||
      updates.address ||
      updates.locality ||
      updates.city ||
      updates.state ||
      updates.country ||
      updates.pincode
    ) {
      updates.location = {
        address: updates.address,
        locality: updates.locality,
        city: updates.city,
        state: updates.state,
        country: updates.country,
        pincode: updates.pincode,
        coordinates: { lat: updates.lat, lng: updates.lng },
      };
    }

    const property = await Property.findByIdAndUpdate(
      req.params.id,
      updates,
      { new: true, runValidators: true }
    ).populate("company", "name email");

    if (!property) return res.status(404).json({ message: "Property not found" });
    res.json({ message: "Property updated", property });
  } catch (error) {
    console.error("❌ Update property error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Delete Property
export const deleteProperty = async (req, res) => {
  try {
    const property = await Property.findByIdAndDelete(req.params.id);
    if (!property) return res.status(404).json({ message: "Property not found" });
    res.json({ message: "Property deleted successfully" });
  } catch (error) {
    console.error("❌ Delete property error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
