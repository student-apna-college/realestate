import React, { useState } from 'react';
import axios from '../api/axios'; // adjust path if needed
import 'bootstrap/dist/css/bootstrap.min.css';
import  vid5 from '../images/vid5.mp4'
import './All.css';
import Footer from './Footer';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    yourmessage: '',
  });

  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('/api/contact-form', formData); // your backend route
      setStatus('success');
      alert(res.data.message);
      setFormData({ name: '', email: '', phone: '', yourmessage: '' }); // clear form
    } catch (error) {
      console.error(error);
      setStatus('error');
      alert(error.response?.data?.message || 'Something went wrong. Try again.');
    }
  };

  return (
    <>
<div className="contact-video-container position-relative">
  <video
    src={vid5} // Replace with your video path or URL
    autoPlay
    muted
    loop
    playsInline
    className="w-100"
    style={{ height: '500px', objectFit: 'cover' }}
  />

  {/* Dark overlay */}
  <div className="video-overlay"></div>

  {/* Overlay content */}
  <div className="video-overlay-content text-white text-center">
    <h1 className="display-4 fw-bold">Contact Us Today</h1>
    <p className="lead">And Deal with indias Trusted Real Estate companies</p>
    <p className="lead">We’re here to help you 24/7</p>
    <button className="btn btn-primary mt-3">Get in Touch</button>
  </div>
</div>

    <div className='contact-container'>
      <div className="container my-5">
        <div className="text-center mb-5">
          <h1 className="display-5 fw-bold text-gradient">Contact Us</h1>
          <p className="lead">We’d love to hear from you. Reach out anytime!</p>
        </div>

        <div className="row">
          <div className="col-md-7 mb-4">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">Full Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email address</label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="phone" className="form-label">Phone Number</label>
                <input
                  type="tel"
                  className="form-control"
                  id="phone"
                  placeholder="+91 1234567890"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="yourmessage" className="form-label">Your Message</label>
                <textarea
                  className="form-control"
                  id="yourmessage"
                  rows="5"
                  placeholder="How can we help you?"
                  value={formData.yourmessage}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>

              <button type="submit" className="btn btn-primary">Send Message</button>
            </form>
          </div>

          <div className="col-md-5">
            <div className="bg-light p-4 rounded shadow-lg">
              <h4 className="mb-3">Get in Touch</h4>
              <p><strong>Email:</strong> devender140196@gmail.com</p>
              <p><strong>Phone:</strong> +91 9717252925</p>
              
              <hr />
              <p>Our support team is available 24x7 to help with orders, returns, or product inquiries.</p>
            </div>
          </div>
        </div>
        
      </div>
    </div>
    <Footer />
    </>
  );
};

export default Contact;
