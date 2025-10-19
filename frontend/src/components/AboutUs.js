import React from 'react';
import './AboutUs.css';

const AboutUs = () => {
  return (
    <div className="about-page">
      <div className="container">
        <div className="about-header">
          <h1>About FreshMart</h1>
          <p className="subtitle">Your Trusted Online Grocery Store</p>
        </div>

        <div className="about-content">
          <div className="about-section">
            <h2>Our Story</h2>
            <p>
              Founded in 2020, FreshMart started with a simple mission: to make fresh, 
              high-quality groceries accessible to everyone. We believe that everyone 
              deserves access to fresh, healthy food without the hassle of visiting 
              multiple stores.
            </p>
          </div>

          <div className="about-section">
            <h2>Our Mission</h2>
            <p>
              To revolutionize the grocery shopping experience by providing 
              fresh products, competitive prices, and convenient delivery 
              right to your doorstep. We're committed to supporting local 
              farmers and sustainable practices.
            </p>
          </div>

          <div className="about-section">
            <h2>Why Choose Us?</h2>
            <div className="features-list">
              <div className="feature-item">
                <h3>Freshness Guaranteed</h3>
                <p>All our products are sourced daily to ensure maximum freshness</p>
              </div>
              <div className="feature-item">
                <h3>Local Partnerships</h3>
                <p>We work directly with local farmers and producers</p>
              </div>
              <div className="feature-item">
                <h3>Eco-Friendly</h3>
                <p>Sustainable packaging and delivery methods</p>
              </div>
              <div className="feature-item">
                <h3>Customer First</h3>
                <p>24/7 customer support and satisfaction guarantee</p>
              </div>
            </div>
          </div>

          <div className="about-section">
            <h2>Contact Information</h2>
            <div className="contact-info">
              <p><strong>Email:</strong> support@freshmart.com</p>
              <p><strong>Phone:</strong> +1 (555) 123-4567</p>
              <p><strong>Address:</strong> 123 Grocery Street, Fresh City, FC 12345</p>
              <p><strong>Business Hours:</strong> 24/7 Online • Delivery: 6AM-11PM</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;