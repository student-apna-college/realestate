import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import m1 from '../images/about home.jpg'; // Banner image
import Apartments1 from '../images/Apartments1.jpg'; // Banner image
import Apartments2 from '../images/Apartments2.jpg'; // Banner image

import './All.css';
import Footer from './Footer';

// Import your local gallery images
import g2 from '../images/construction.jpg';
import g3 from '../images/cement.jpg';

import g5 from '../images/Independent Houses indian.jpg';




const About = () => {
  // Image sets for rotating gallery
  const imageSets = [
    [g2, g3, ],
    [g5, ],
  ];

  const [currentSet, setCurrentSet] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSet((prev) => (prev + 1) % imageSets.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="about-wrapper">
      {/* Top Bootstrap Carousel with auto-slide */}
      <div
        id="aboutCarousel"
        className="carousel slide mb-5"
        data-bs-ride="carousel"
        data-bs-interval="2000" // Automatically slides every 3 seconds
      >
        <div className="carousel-indicators">
          <button
            type="button"
            data-bs-target="#aboutCarousel"
            data-bs-slide-to="0"
            className="active"
            aria-current="true"
            aria-label="Slide 1"
          ></button>
          <button
            type="button"
            data-bs-target="#aboutCarousel"
            data-bs-slide-to="1"
            aria-label="Slide 2"
          ></button>
          <button
            type="button"
            data-bs-target="#aboutCarousel"
            data-bs-slide-to="2"
            aria-label="Slide 3"
          ></button>
        </div>
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img
              src={m1}
              className="d-block w-100"
              alt="Banner 1"
              style={{ maxHeight: '500px', objectFit: 'cover' }}
            />
          </div>
          <div className="carousel-item">
            <img
              src={Apartments1}
              className="d-block w-100"
              alt="Banner 2"
              style={{ maxHeight: '500px', objectFit: 'cover' }}
            />
          </div>
          <div className="carousel-item">
            <img
              src={Apartments2}
              className="d-block w-100"
              alt="Banner 3"
              style={{ maxHeight: '500px', objectFit: 'cover' }}
            />
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#aboutCarousel"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#aboutCarousel"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>

      <div className="container my-5">
        {/* Hero Section */}
        <div className="bg-dark text-white text-center p-5 mb-4 rounded shadow">
          <h1 className="display-4">Our Philosophy</h1>
          <p className="lead">We believe real estate should be a journey of trust, not stress. That’s why we focus on:</p>
          <p>Ethical business practices</p>
          <p>Clear communication with clients</p>
          <p>On-time project delivery</p>
          <p></p>

        </div>

        {/* Mission Section */}
        <div className="mb-5">
          <h2>Our Mission</h2>
          <p>
            To create sustainable, high-quality living and working spaces that enhance communities and enrich lives.
            <br />
            <br />
            Core Values
            <br />
           <p>Integrity: We uphold honesty in all dealings.</p>
           <p>Innovation: We embrace modern technologies to deliver smarter, more efficient spaces.</p>
           <p>Customer First: We put your needs and satisfaction at the center of everything.</p>
            
            <br />
            <br />
            <p>Whether you’re looking for your dream home, investing in property, or seeking a reliable commercial space, Shubhawas is your trusted partner. Our legacy of quality, commitment, and transparency stands as a testament to our dedication to excellence.

</p>
          </p>
        </div>

        {/* Milestones Section */}
        <div className="mb-5">
          <h2>Our Journey Starts with You</h2>
          <ul className="list-group list-group-flush">
            {/* Add milestones here if needed */}
          </ul>
        </div>

        {/* Auto Changing Image Gallery */}
        <div className="mb-5">
          <h2>Inside ShubhAwas</h2>
          <br />
          <div className="row g-3">
            {imageSets[currentSet].map((img, idx) => (
              <div key={idx} className="col-lg-3 col-md-4 col-sm-6 col-12">
                <img
                  src={img}
                  className="img-fluid rounded shadow-sm"
                  alt={`Gallery ${idx + 1}`}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default About;
