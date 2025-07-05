// // /models/Order.js
// import mongoose from 'mongoose';

// const orderSchema = new mongoose.Schema({
//   user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
//   shop: { type: mongoose.Schema.Types.ObjectId, ref: 'Shop' },
//   items: Array,
//   totalAmount: Number,
//   address: String, // <-- add this
//   paymentMethod: String, // 'COD' or 'Online'
//   status: { type: String, default: 'Pending' },
//   deliveredAt: Date
// }, { timestamps: true });

// export default mongoose.model('Order', orderSchema);
