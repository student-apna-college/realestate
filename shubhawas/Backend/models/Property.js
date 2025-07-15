// import mongoose from 'mongoose';
// const productSchema = new mongoose.Schema({
//   name: String,
//   description: String,
//   price: Number,
//   image: String,
//   shopId: { type: mongoose.Schema.Types.ObjectId, ref: 'Shop' },
//   category: { type: String, required: true, enum: ['Grocery', 'Clothing', 'Electronics', 'Construction', 'Other'] },       // e.g., Clothes, Vegetables, Tools
//   subCategory: { type: String,},
//   quantity: { type: Number, default: 1 }, // stock count
//   unit: { type: String ,enum:['kg' , 'piece', 'litre' ,'others']}, 
//   createdAt: { type: Date, default: Date.now }

// });
// export default mongoose.model('Product', productSchema);




import mongoose from 'mongoose';

const propertySchema = new mongoose.Schema({
  title: {
    type: String,
    
    trim: true, // e.g., "2BHK Apartment in Andheri West"
  },
  description: {
    type: String,
   
  },
  propertyType: {
    type: String,
    enum: ['Apartment', 'Independent House', 'Villa', 'Plot', 'Commercial Office', 'Shop', 'Warehouse', 'Other'],
   
  },
  purpose: {
    type: String,
    enum: ['Sale', 'Rent'],
    
  },
  price: {
    type: String,
   
  },
  maintenance: {
    type: Number, // monthly maintenance cost (optional)
  },
  area: {
    type: Number, // in sq. ft.
   
  },
  bedrooms: {
    type: Number,
    default: 0, // 0 for commercial or plots
  },
  bathrooms: {
    type: Number,
    default: 0,
  },
  balconies: {
    type: Number,
    default: 0,
  },
  furnishing: {
    type: String,
    enum: ['Unfurnished', 'Semi-Furnished', 'Fully-Furnished'],
  },
  parking: {
    type: Number, // number of parking spots
    default: 0,
  },
  amenities: [
    {
      type: String, // e.g., "Lift", "Gym", "Swimming Pool", "Power Backup"
    },
  ],
  images: [
    {
      url: String, // image CDN or server URL
      alt: String, // optional alt text
    },
  ],
  location: {
    address: { type: String,},
    locality: { type: String }, // e.g., "Andheri West"
    city: { type: String,  },
    state: { type: String, },
    country: { type: String, default: 'India' },
    pincode: { type: String },
    coordinates: {
      lat: { type: Number },
      lng: { type: Number },
    },
  },
  projectName: {
    type: String, // e.g., "Oberoi Esquire"
  },
  reraId: {
    type: String, // RERA certificate number (if applicable)
  },
  availableFrom: {
    type: Date,
  },


 companyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Company' },


  listedDate: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ['Active', 'Sold', 'Rented', 'Inactive'],
    default: 'Active',
  },
});

export default mongoose.model('Property', propertySchema);
