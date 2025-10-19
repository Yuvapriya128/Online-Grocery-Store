import React from 'react';
import './PolicyPages.css';

const PrivacyPolicy = () => {
  return (
    <div className="policy-page">
      <div className="container">
        <div className="policy-header">
          <h1>Privacy Policy</h1>
          <p>Last updated: October 2025</p>
        </div>

        <div className="policy-content">
          <section className="policy-section">
            <h2>Information We Collect</h2>
            <p>
              We collect information you provide directly to us, such as when you 
              create an account, place an order, or contact us. This may include:
            </p>
            <ul>
              <li>Personal identification information (Name, email address, phone number)</li>
              <li>Delivery address and location data</li>
              <li>Payment information (processed securely through our payment partners)</li>
              <li>Communication preferences</li>
            </ul>
          </section>

          <section className="policy-section">
            <h2>How We Use Your Information</h2>
            <p>We use the information we collect to:</p>
            <ul>
              <li>Process and deliver your orders</li>
              <li>Communicate with you about orders, products, services, and promotional offers</li>
              <li>Improve our services and develop new features</li>
              <li>Prevent fraud and enhance security</li>
              <li>Comply with legal obligations</li>
            </ul>
          </section>

          <section className="policy-section">
            <h2>Information Sharing</h2>
            <p>
              We do not sell your personal information to third parties. We may share 
              your information with:
            </p>
            <ul>
              <li>Delivery partners to fulfill your orders</li>
              <li>Payment processors to handle transactions</li>
              <li>Service providers who assist our operations</li>
              <li>Legal authorities when required by law</li>
            </ul>
          </section>

          <section className="policy-section">
            <h2>Data Security</h2>
            <p>
              We implement appropriate security measures to protect your personal 
              information against unauthorized access, alteration, disclosure, or 
              destruction. However, no internet transmission is completely secure, 
              so we cannot guarantee absolute security.
            </p>
          </section>

          <section className="policy-section">
            <h2>Your Rights</h2>
            <p>You have the right to:</p>
            <ul>
              <li>Access and receive a copy of your personal data</li>
              <li>Correct inaccurate or incomplete information</li>
              <li>Request deletion of your personal data</li>
              <li>Object to processing of your personal data</li>
              <li>Withdraw consent at any time</li>
            </ul>
          </section>

          <section className="policy-section">
            <h2>Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us at:
              <br />
              <strong>Email:</strong> privacy@freshmart.com
              <br />
              <strong>Phone:</strong> +1 (555) 123-4567
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;