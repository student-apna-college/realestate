import mongoose from 'mongoose';
const companySchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  image: { type: String, required: true },
  admin: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now },
 address: {
    street: String,
    city: String,
    state: String,
    country: String,
    zipCode: String,
  },

  website: {
    type: String,
  },
  phone:{ type: String, },
  pan: { type: String, },
  gstnumber:{ type: String,  },
  
});

export default mongoose.model('Company', companySchema);