// import express from 'express';
// import Cart from '../models/Cart.js';
// import { protect } from '../middleware/authMiddleware.js';
// import Property from '../models/Property.js';

// const router = express.Router();

// // Get cart for logged-in user
// router.get('/', protect, async (req, res) => {
//   const cart = await Cart.findOne({ user: req.user._id });
//   res.json(cart || { items: [] });
// });

// // ✅ Add to cart with product image fetched from DB
// router.post('/add', protect, async (req, res) => {
//   const { itemId, quantity } = req.body;
//   let cart = await Cart.findOne({ user: req.user._id });
//   const product = await Property.findById(itemId);

//   if (!product) return res.status(404).json({ message: 'Product not found' });

//   if (!cart) cart = new Cart({ user: req.user._id, items: [] });

//   const index = cart.items.findIndex(item => item._id === itemId);

//   if (index > -1) {
//     cart.items[index].quantity += quantity;
//   } else {
//     cart.items.push({
//       _id: itemId,
//       name: product.name,
//       price: product.price,
//       image: product.image,
//       quantity,
//       shopId: product.shopId.toString(),
//       unit: product.unit,
//       subCategory: product.subCategory,
//     });
//   }

//   await cart.save();
//   res.json(cart);
// });


// // routes/cartRoutes.js
// router.delete('/item/:itemId', protect, async (req, res) => {
//   const cart = await Cart.findOne({ user: req.user._id });
//   if (!cart) return res.status(404).json({ message: 'Cart not found' });

//   cart.items = cart.items.filter(item => item._id.toString() !== req.params.itemId);
//   await cart.save();
//   res.json({ message: 'Item removed', cart });
// });

// // ✅ Clear all items from cart
// router.post('/clear', protect, async (req, res) => {
//   await Cart.findOneAndUpdate({ user: req.user._id }, { items: [] });
//   res.json({ items: [] });
// });



// export default router;
