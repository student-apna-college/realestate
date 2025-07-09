import React from 'react';
import { Link } from 'react-router-dom';
import weblogo from '../images/subhawas.png'
import "./All.css";

export default function Footer() {
  return (
    <footer className="text-light pt-5 pb-3" style={{backgroundColor:"black"}}>
      <div className="container">
        <div className="row">

          {/* About Section */}
           <div className="col-12 col-md-4 mb-4 text-center">
            <img src={weblogo} alt="LocalMart logo" className="footer-logo mb-3" />
            <h5>About ShubhAwas</h5>
            <p>
              ShubhAwas is your one-stop online store for all your shopping needs. Quality products, best prices, and fast delivery.
            </p>
          </div>

          {/* Customer Service */}
          <div className="col-6 col-md-2 mb-4">
            <h6>Customer Service</h6>
            <ul className="list-unstyled">
              <li><Link to="/contact" className="text-light text-decoration-none">Help & FAQs</Link></li>
              <li><Link to="/" className="text-light text-decoration-none">Shipping & Delivery</Link></li>
              <li><Link to="" className="text-light text-decoration-none">Returns & Exchanges</Link></li>
              <li><Link to="/contact" className="text-light text-decoration-none">Contact Us</Link></li>
            </ul>
          </div>

          {/* Quick Links */}
          <div className="col-6 col-md-2 mb-4git">
            <h6>Quick Links</h6>
            <ul className="list-unstyled">
              <li><Link to="/" className="text-light text-decoration-none">Company</Link></li>
              <li><Link to="/about" className="text-light text-decoration-none">About Us</Link></li>
              <li><Link to="/vendor-onboarding-guide" className="text-light text-decoration-none">Client Onboarding Guide</Link></li>
              <li><Link to="/terms" className="text-light text-decoration-none">Terms & Conditions</Link></li>
               <li><Link to="/ragister-form" className="text-light text-decoration-none">Register Company Here</Link></li>
            </ul>
          </div>

          {/* Follow Us */}
          <div className="col-12 col-md-4 mb-4">
            <h6>Follow Us</h6>
            <div className="d-flex gap-3">
              <Link to="https://facebook.com" target="_blank" rel="noreferrer" className="text-light fs-4">
                <i className="bi bi-facebook"></i>
              </Link>
              <Link to="https://twitter.com" target="_blank" rel="noreferrer" className="text-light fs-4">
                <i className="bi bi-twitter"></i>
              </Link>
              <Link to="https://instagram.com" target="_blank" rel="noreferrer" className="text-light fs-4">
                <i className="bi bi-instagram"></i>
              </Link>
              <Link to="https://linkedin.com" target="_blank" rel="noreferrer" className="text-light fs-4">
                <i className="bi bi-linkedin"></i>
              </Link>
            </div>
            <p className="mt-3 small">&copy; {new Date().getFullYear()} ShubhAwas. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
