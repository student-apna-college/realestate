import Company from '../models/Company.js';
import Property from '../models/Property.js';
import User from '../models/User.js';


// controllers/adminController.js
import mongoose from 'mongoose';

export const getAdminCompanyDetails = async (req, res) => {
  try {
    const adminId = req.user.id;
    const objectAdminId = new mongoose.Types.ObjectId(adminId);

    const admin = await User.findById(objectAdminId).select('name email');
    const company = await Company.findOne({ admin: objectAdminId }).select('name image');

    if (!admin || !company) {
      return res.status(404).json({ message: 'Admin or shop not found' });
    }

    const products = await Property.find({ shopId: company._id }).select('name price');

    res.json({
    
      company: {
        _id: company._id, // ✅ Add this
        name: company.name,
        image: company.image,
        products
      }
    });
  } catch (error) {
    console.error("Error in getAdminShopDetails:", error);
    res.status(500).json({ message: 'Server error' });
  }
};



// import Order from '../models/Order.js';

// export const getOrdersForAdmin = async (req, res) => {
//   try {
//     const adminId = req.user.id;

//     // Get the admin's shop
//     const shop = await Company.findOne({ admin: adminId });

//     if (!shop) {
//       return res.status(404).json({ message: 'Shop not found for admin' });
//     }

//     const orders = await Order.find({ shop: shop._id })
//       .populate('user', 'name email')
//       .populate('items.product', 'name price');

//     // Hide address unless Delivered
//     const modifiedOrders = orders.map(order => {
//       const orderObj = order.toObject();
//       if (orderObj.status !== 'Delivered') {
//         orderObj.address = null;
//       }
//       return orderObj;
//     });

//     res.json(modifiedOrders);
//   } catch (error) {
//     console.error('Error fetching admin orders:', error);
//     res.status(500).json({ message: 'Server error' });
//   }
// };




// controllers/adminController.js


// export const updateOrderStatus = async (req, res) => {
//   try {
//     const { orderId } = req.params;
//     const { status } = req.body;

//     // 1. Find the order
//     const order = await Order.findById(orderId);
//     if (!order) {
//       return res.status(404).json({ message: 'Order not found' });
//     }

//     // 2. Ensure current admin owns the shop this order belongs to
//     const shop = await Company.findOne({ _id: order.shop, admin: req.user.id });
//     if (!shop) {
//       return res.status(403).json({ message: 'Unauthorized access to this order' });
//     }

//     // 3. Update status and deliveredAt
//     order.status = status;
//     if (status === 'Delivered') {
//       order.deliveredAt = new Date();
//     }

//     await order.save();

//     res.json({
//       message: 'Order status updated successfully',
//       order,
//     });
//   } catch (err) {
//     console.error('Error updating order status:', err);
//     res.status(500).json({ message: 'Server error' });
//   }
// };
