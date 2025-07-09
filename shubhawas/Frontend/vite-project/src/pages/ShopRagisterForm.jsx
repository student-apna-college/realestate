import { useState } from 'react';
import axios from 'axios';
import './All.css';
import Footer from './Footer';

export default function ShopRegisterForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    pan: '',
    address: '',
    categoryofshop: '',
  });

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    try {
      const res = await axios.post('http://localhost:5000/shop/ragister/shopform', formData, {
        withCredentials: true,
      });
      setMessage('✅ Shop registered successfully we will update you soon for next step');
      setFormData({
        name: '',
        email: '',
        phone: '',
        pan: '',
        address: '',
        categoryofshop: '',
      });
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong!');
    }
  };

  return (
    <div className="shop-form-container">
      <h2>Register Your Shop</h2>
      <form onSubmit={handleSubmit} className="shop-form">
        <div className="form-group">
          <label>Shop Name</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Phone</label>
          <input type="text" name="phone" value={formData.phone} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>PAN Number</label>
          <input type="text" name="pan" value={formData.pan} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Shop Address</label>
          <input type="text" name="address" value={formData.address} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Shop Category</label>
          <select name="categoryofshop" value={formData.categoryofshop} onChange={handleChange} required>
            <option value="">Select Category</option>
            <option value="Grocery">Grocery</option>
            <option value="Clothing">Clothing</option>
            <option value="Electronics">Electronics</option>
            <option value="Construction">Construction</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <button type="submit" className="submit-btn">Submit</button>
      </form>
      {message && <p className="success-msg">{message}</p>}
      {error && <p className="error-msg">{error}</p>}
         
    </div>
   
  );

}