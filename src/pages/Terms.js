import React from 'react';
import './PolicyPages.css';

const Terms = () => {
  return (
    <div className="policy-page">
      <div className="container">
        <div className="policy-header">
          <h1>Terms & Conditions</h1>
          <p>Last updated: December 2024</p>
        </div>

        <div className="policy-content">
          <section className="policy-section">
            <h2>Acceptance of Terms</h2>
            <p>
              By accessing and using FreshMart's services, you accept and agree to be 
              bound by the terms and provision of this agreement.
            </p>
          </section>

          <section className="policy-section">
            <h2>Account Registration</h2>
            <p>
              You must create an account to use certain features of our service. 
              You are responsible for maintaining the confidentiality of your 
              account and password and for restricting access to your computer.
            </p>
          </section>

          <section className="policy-section">
            <h2>Ordering and Payment</h2>
            <ul>
              <li>All orders are subject to product availability</li>
              <li>Prices are subject to change without notice</li>
              <li>We accept various payment methods as displayed during checkout</li>
              <li>Payment is processed securely through our payment partners</li>
            </ul>
          </section>

          <section className="policy-section">
            <h2>Delivery</h2>
            <ul>
              <li>Delivery times are estimates and not guaranteed</li>
              <li>Free delivery available on orders over $50</li>
              <li>Someone must be present at the delivery address to receive the order</li>
              <li>We are not responsible for delays due to unforeseen circumstances</li>
            </ul>
          </section>

          <section className="policy-section">
            <h2>Returns and Refunds</h2>
            <ul>
              <li>Fresh products cannot be returned unless spoiled or damaged</li>
              <li>Returns must be initiated within 24 hours of delivery</li>
              <li>Refunds will be processed to the original payment method</li>
              <li>Contact customer service for return authorization</li>
            </ul>
          </section>

          <section className="policy-section">
            <h2>Limitation of Liability</h2>
            <p>
              FreshMart shall not be liable for any indirect, incidental, special, 
              consequential or punitive damages resulting from your use of or inability 
              to use the service.
            </p>
          </section>

          <section className="policy-section">
            <h2>Changes to Terms</h2>
            <p>
              We reserve the right to modify these terms at any time. We will notify 
              users of any material changes by posting the new terms on the site.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Terms;