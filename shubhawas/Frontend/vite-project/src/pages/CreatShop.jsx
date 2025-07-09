import { useState } from 'react';
import axios from '../api/axios';
import './All.css';

export default function SuperAdminCreateCompany() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    pan: '',
    gstnumber: '',
    website: '',
    admin: '',
    address: {
      street: '',
      city: '',
      state: '',
      country: '',
      zipCode: '',
    },
  });
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Handle nested address fields
    if (name.startsWith('address.')) {
      const field = name.split('.')[1];
      setFormData((prev) => ({
        ...prev,
        address: {
          ...prev.address,
          [field]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleImage = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image) return alert('Please upload an image');

    const data = new FormData();

    // Append simple fields
    data.append('name', formData.name);
    data.append('phone', formData.phone);
    data.append('pan', formData.pan);
    data.append('gstnumber', formData.gstnumber);
    data.append('website', formData.website);
    data.append('admin', formData.admin);

    // Append address fields individually
    Object.entries(formData.address).forEach(([key, val]) => {
      data.append(`address[${key}]`, val);
    });

    data.append('image', image);

    try {
      const res = await axios.post('/api/shops/', data);
      setMessage('✅ Company Created: ' + res.data.name);

      // Reset form
      setFormData({
        name: '',
        phone: '',
        pan: '',
        gstnumber: '',
        website: '',
        admin: '',
        address: { street: '', city: '', state: '', country: '', zipCode: '' },
      });
      setImage(null);
    } catch (err) {
      console.error(err);
      setMessage('❌ Failed to create company: ' + (err.response?.data?.message || 'Unknown error'));
    }
  };

  return (
    <div className="shop-form-container">
      <h2>Create Company (SuperAdmin only)</h2>
      {message && <p className="message">{message}</p>}
      <form onSubmit={handleSubmit} encType="multipart/form-data" className="shop-form">
        <input type="text" name="name" placeholder="Company Name" value={formData.name} onChange={handleChange} required />

        <h4>Address</h4>
        <input type="text" name="address.street" placeholder="Street" value={formData.address.street} onChange={handleChange} />
        <input type="text" name="address.city" placeholder="City" value={formData.address.city} onChange={handleChange} />
        <input type="text" name="address.state" placeholder="State" value={formData.address.state} onChange={handleChange} />
        <input type="text" name="address.country" placeholder="Country" value={formData.address.country} onChange={handleChange} />
        <input type="text" name="address.zipCode" placeholder="Zip Code" value={formData.address.zipCode} onChange={handleChange} />

        <input type="text" name="phone" placeholder="Phone (optional)" value={formData.phone} onChange={handleChange} />
        <input type="text" name="pan" placeholder="PAN Number (optional)" value={formData.pan} onChange={handleChange} />
        <input type="text" name="gstnumber" placeholder="GST Number (optional)" value={formData.gstnumber} onChange={handleChange} />
        <input type="text" name="website" placeholder="Website URL (optional)" value={formData.website} onChange={handleChange} />
        <input type="text" name="admin" placeholder="Admin ObjectId" value={formData.admin} onChange={handleChange} required />

        <input type="file" accept="image/*" onChange={handleImage} required />

        <button type="submit">Create Company</button>
      </form>
    </div>
  );
}
