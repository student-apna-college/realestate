import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Footer from "../Footer";

const VendorOnboarding = () => {
  return (
    <div className="container my-5">
      <div className="text-center mb-4">
        <h2 className="text-primary">Real Estate Partner Onboarding Guide</h2>
        <p className="lead">
          Welcome to the ShubhAwas Real Estate Partner Community! Here’s how to start listing properties securely and ethically:
        </p>
      </div>

      {/* Step 1 */}
      <div className="card mb-4 shadow-sm">
        <div className="card-body">
          <h5 className="card-title">Step 1: Register as a Property Agent or Owner</h5>
          <ul>
            <li>Contact ShubhAwas support via email or phone below.</li>
            <li>Provide accurate personal details and valid government-issued ID (Aadhaar, PAN).</li>
            <li>Submit ownership proof or authorization documents for the property.</li>
          </ul>
        </div>
      </div>

      {/* Step 2 */}
      <div className="card mb-4 shadow-sm">
        <div className="card-body">
          <h5 className="card-title">Step 2: List Verified Properties</h5>
          <ul>
            <li>After approval, log in to your dashboard and click "Add Property."</li>
            <li>Upload real property photos (max size: 500KB), pricing, location, and legal documents.</li>
            <li>Choose accurate property categories (e.g., Residential, Commercial, Land).</li>
          </ul>
        </div>
      </div>

      {/* Step 3 */}
      <div className="card mb-4 shadow-sm">
        <div className="card-body">
          <h5 className="card-title">Step 3: Respond to Buyer Inquiries</h5>
          <ul>
            <li>Ensure that potential buyers can contact you via provided contact details.</li>
            <li>Respond quickly to questions or site visit requests.</li>
            <li>Keep property availability status updated at all times.</li>
          </ul>
        </div>
      </div>

      {/* Step 4 */}
      <div className="card mb-4 shadow-sm">
        <div className="card-body">
          <h5 className="card-title">Step 4: Build Trust and Reputation</h5>
          <ul>
            <li>Share your property listing links via WhatsApp, Facebook, etc.</li>
            <li>Encourage verified clients to leave reviews after successful deals.</li>
          </ul>
        </div>
      </div>

      {/* Step 5 */}
      <div className="card mb-4 shadow-sm">
        <div className="card-body">
          <h5 className="card-title">Step 5: Follow Legal and Ethical Guidelines</h5>
          <ul>
            <li>Only list properties that are genuine and legally clear.</li>
            <li>Do not upload fake or misleading property details.</li>
            <li>Deal transparently with buyers and resolve disputes fairly.</li>
          </ul>
        </div>
      </div>

      {/* Help */}
      <div className="card text-white bg-primary mb-4">
        <div className="card-body">
          <h5 className="card-title">Need Help or Want to Register?</h5>
          <p>📧 Email: <a className="text-white" href="mailto:devender140196@gmail.com">devender140196@gmail.com</a></p>
          <p>📞 Phone: +91-9717252925</p>
        </div>
      </div>

      <Footer />
    </div>
  );
};


export default VendorOnboarding;
