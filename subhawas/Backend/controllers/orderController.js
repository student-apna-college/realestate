// import Order from "../models/Order.js";
// import Shop from "../models/Shop.js";

// export const placeOrder = async (req, res) => {
//   try {
//     const { items, totalAmount, shopIds, address, paymentMethod } = req.body;

//     const DELIVERY_CHARGE_PER_SHOP = 60;

//     const createdOrders = await Promise.all(
//       shopIds.map(async (shopId) => {
//         const shopItems = items.filter((item) => item.shopId === shopId);
//         const itemTotal = shopItems.reduce(
//           (sum, i) => sum + i.price * i.quantity,
//           0
//         );

//         const finalTotal = itemTotal + DELIVERY_CHARGE_PER_SHOP;

//         return await Order.create({
//           user: req.user._id,
//           shop: shopId,
//           items: shopItems,
//           totalAmount: finalTotal,
//           address,
//           paymentMethod,
//           status: "Pending",
//           deliveryCharge: DELIVERY_CHARGE_PER_SHOP,
//         });
//       })
//     );

//     res.status(201).json({
//       message: `${createdOrders.length} orders placed successfully via Cash on Delivery`,
//       orders: createdOrders.map((o) => o._id),
//     });
//   } catch (err) {
//     console.error("❌ Order placement failed:", err.message);
//     res.status(500).json({ message: err.message });
//   }
// };

// export const myOrder = async (req, res) => {
//   try {
//     const orders = await Order.find({ user: req.user._id }).sort({
//       createdAt: -1,
//     });
//     res.json(orders);
//   } catch (err) {
//     res.status(500).json({ message: "Failed to fetch orders" });
//   }
// };

// export const cancelOrder = async (req, res) => {
//   const { id } = req.params;
//   try {
//     const order = await Order.findById(id);
//     if (!order) return res.status(404).send("Order not found");
//     order.status = "Cancelled";
//     await order.save();
//     res.status(200).send("Order cancelled");
//   } catch (error) {
//     res.status(500).send("Server error");
//   }
// };
