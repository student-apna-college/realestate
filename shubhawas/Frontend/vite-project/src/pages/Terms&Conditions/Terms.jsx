import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from '../Footer';

const TermsConditions = () => {
  return (
    <div className="container py-5">
      <h1 className="mb-4 text-center">Terms & Conditions</h1>

      <section className="mb-4">
        <h4>Welcome to ShubhAwas Real Estate!</h4>
        <p>
          These Terms and Conditions ("Terms") govern your access to and use of our real estate platform, services, and tools. 
          By accessing or listing a property on our platform, you agree to comply with and be bound by these Terms. 
          Our goal is to provide a secure and fraud-free environment for all users.
        </p>
      </section>

      <section className="mb-4">
        <h5>1. Eligibility</h5>
        <ul>
          <li>You must be at least 18 years old to list or inquire about properties.</li>
          <li>You must provide valid identity verification (e.g., Aadhaar, PAN) during registration.</li>
          <li>You must comply with all applicable real estate laws and regulations in India.</li>
        </ul>
      </section>

      <section className="mb-4">
        <h5>2. Account Registration</h5>
        <ul>
          <li>You are responsible for maintaining the security of your account credentials.</li>
          <li>You must not impersonate others or use false information.</li>
          <li>All personal and property details submitted must be accurate and verifiable.</li>
        </ul>
      </section>

      <section className="mb-4">
        <h5>3. Property Listings</h5>
        <ul>
          <li>Only genuine and legally owned properties may be listed.</li>
          <li>Property details (e.g., price, location, documents) must be honest and up-to-date.</li>
          <li>Uploading fraudulent or misleading listings may lead to legal action.</li>
        </ul>
      </section>

      <section className="mb-4">
        <h5>4. Documentation & Verification</h5>
        <ul>
          <li>All sellers must submit ownership proof and government-approved property documents.</li>
          <li>Buyers may request site visits and document verification through secure channels.</li>
          <li>We may verify listings manually or via third-party verification partners.</li>
        </ul>
      </section>

      <section className="mb-4">
        <h5>5. Payments & Transactions</h5>
        <ul>
          <li>We recommend that all monetary transactions happen via verified payment gateways or registered agents.</li>
          <li>ShubhAwasis not responsible for payments made directly between buyer and seller.</li>
          <li>Never pay any booking amount without confirming documents and seller identity.</li>
        </ul>
      </section>

      <section className="mb-4">
        <h5>6. Fraud Prevention Policy</h5>
        <ul>
          <li>Scammers or users providing fake property information will be banned permanently.</li>
          <li>Suspected fraud will be reported to the concerned law enforcement authorities.</li>
          <li>We reserve the right to remove any suspicious listing without prior notice.</li>
        </ul>
      </section>

      <section className="mb-4">
        <h5>7. User Conduct</h5>
        <ul>
          <li>All users must behave respectfully with others on the platform.</li>
          <li>Harassment, abuse, or unsolicited messages are strictly prohibited.</li>
          <li>Users must follow ethical business and communication practices.</li>
        </ul>
      </section>

      <section className="mb-4">
        <h5>8. Intellectual Property</h5>
        <ul>
          <li>All content you upload (images, videos, descriptions) must be your own or authorized for use.</li>
          <li>You grant us the right to display and promote your property listings.</li>
        </ul>
      </section>

      <section className="mb-4">
        <h5>9. Platform Rights</h5>
        <ul>
          <li>We may update or remove listings at our sole discretion.</li>
          <li>We may update services, features, or fees at any time with notice.</li>
        </ul>
      </section>

      <section className="mb-4">
        <h5>10. Limitation of Liability</h5>
        <ul>
          <li>We are not a broker or property dealer. We act only as a listing and discovery platform.</li>
          <li>We do not guarantee property sales, rentals, or returns on investment.</li>
          <li>We are not responsible for losses due to fraudulent interactions between users.</li>
        </ul>
      </section>

      <section className="mb-4">
        <h5>11. Privacy Policy</h5>
        <ul>
          <li>Your data is handled securely and in accordance with our Privacy Policy.</li>
          <li>We do not sell or misuse your data.</li>
          <li>You may receive important alerts via email or phone related to your listings or interests.</li>
        </ul>
      </section>

      <section className="mb-4">
        <h5>12. Termination</h5>
        <ul>
          <li>You may deactivate your account anytime from settings.</li>
          <li>We may suspend or terminate accounts found violating our fraud prevention policies or terms.</li>
        </ul>
      </section>

      <section className="mb-4">
        <h5>13. Changes to Terms</h5>
        <p>
          We may revise these Terms periodically. Continued use of the platform after updates implies acceptance of the revised terms.
        </p>
      </section>

      <section className="mb-4">
        <h5>14. Contact Us / Report a Fraud</h5>
        <ul>
          <li>📧 Email: <a href="mailto:devender140196@gmail.com">devender140196@gmail.com</a></li>
          <li>📞 Phone: +91-9717252925</li>
          <li>To report a fraudulent listing, email us with the listing link and evidence.</li>
        </ul>
      </section>

      <Footer />
    </div>
  );
};

export default TermsConditions;
