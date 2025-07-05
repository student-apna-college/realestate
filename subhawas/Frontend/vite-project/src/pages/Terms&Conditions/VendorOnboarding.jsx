import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Footer from "../Footer";


const VendorOnboarding = () => {
  return (
    <div className="container my-5">
      <div className="text-center mb-4">
        <h2 className="text-primary">Vendor Onboarding Guide</h2>
        <p className="lead">
          Welcome to BlendBaba Vendor Community! Here's how to start selling:
        </p>
      </div>

      <div className="card mb-4 shadow-sm">
        <div className="card-body">
          <h5 className="card-title">Step 1: Register Your Shop </h5>
          <ul>
            <li>
              BlendBaba @contact on below Email & phone
            </li>
            <li>
              Fill in your name, shop details, business location, and contact
              info
            </li>
            <li>Submit necessary verification (Aadhar, GST optional)</li>
          </ul>
        </div>
      </div>

      <div className="card mb-4 shadow-sm">
        <div className="card-body">
          <h5 className="card-title">Step 2: Add Products</h5>
          <ul>
            <li>After approval, log in and click "Add Product"</li>
            <li>Upload clear images,(max: 500kb) enter price, stock, and description</li>
            <li>Set product categories (e.g. Grocery, Clothing)</li>
          </ul>
        </div>
      </div>

      <div className="card mb-4 shadow-sm">
        <div className="card-body">
          <h5 className="card-title">Step 3: Manage Orders</h5>
          <ul>
            <li>Since payments are offline, ensure buyers can reach you</li>
            <li>Respond to order inquiries quickly</li>
            <li>Keep your product stock updated</li>
          </ul>
        </div>
      </div>

      <div className="card mb-4 shadow-sm">
        <div className="card-body">
          <h5 className="card-title">Step 4: Promote Your Shop</h5>
          <ul>
            <li>Share your shop link on WhatsApp, Facebook, etc.</li>
            <li>Ask satisfied customers for reviews</li>
          </ul>
        </div>
      </div>

      <div className="card mb-4 shadow-sm">
        <div className="card-body">
          <h5 className="card-title">Step 5: Follow Rules</h5>
          <ul>
            <li>Only list legal products</li>
            <li>Avoid fake listings or misleading prices</li>
            <li>Handle disputes fairly and honestly</li>
          </ul>
        </div>
      </div>

      <div className="card text-white bg-primary mb-4">
        <div className="card-body">
          <h5 className="card-title">Need Help?</h5>
          <p>📧 devender140196@gmail.com</p>
          <p>📞 +91-9717252925</p>
        </div>
      </div>
      <Footer></Footer>
    </div>
    
  );
};

export default VendorOnboarding;
