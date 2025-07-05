import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../api/axios';
import Footer from './Footer';

export default function CheckoutCOD() {
  const [address, setAddress] = useState('');
  const [cart, setCart] = useState({ items: [] });
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('/api/cart', { withCredentials: true })
      .then(res => setCart(res.data))
      .catch(() => setCart({ items: [] }));
  }, []);

  const subtotal = cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  // const gst = +(subtotal * 0.18).toFixed(2);
  const deliveryCharge = 60;
  const totalAmount = +(subtotal +  deliveryCharge).toFixed(2);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const shopIds = [...new Set(cart.items.map(item => item.shopId))];
await axios.post('/api/orders', {
  items: cart.items,
  shopIds,
  totalAmount,
  address,
  paymentMethod: 'COD'
}, {
  withCredentials: true
});
      await axios.post('/api/cart/clear', {}, { withCredentials: true });

      navigate('/order-success');
    } catch (err) {
      console.error(err);
      alert('Failed to place order. Please login.');
    }
  };

  return (
    <div className="container py-4">
      <h2>Enter Delivery Address</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          rows="4"
          className="form-control mb-3"
          placeholder="Enter Name mobile, pin code, house address, landmark"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
        ></textarea>
        <p><strong>Total Amount (COD): ₹{totalAmount}</strong></p>
        <button type="submit" className="btn btn-primary">Place Order</button>
      </form>
      <Footer/>
    </div>
  );
}
