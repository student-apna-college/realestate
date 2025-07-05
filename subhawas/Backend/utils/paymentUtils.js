import razorpay from './razorpay.js';
import Shop from '../models/Shop.js';

export const splitPayment = async (shopId, totalAmount) => {
  const shop = await Shop.findById(shopId);
  if (!shop || !shop.razorpayAccountId) throw new Error('Shop or Razorpay account not found');

  const payment = await razorpay.orders.create({
    amount: totalAmount * 100, // in paise
    currency: 'INR',
    payment_capture: 1,
    transfers: [
      {
        account: shop.razorpayAccountId,
        amount: Math.floor(totalAmount * 0.95 * 100),
        currency: 'INR'
      },
      {
        account: process.env.SUPERADMIN_ACCOUNT_ID,
        amount: Math.floor(totalAmount * 0.05 * 100),
        currency: 'INR'
      }
    ]
  });

  return payment;
};
