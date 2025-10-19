import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>FreshMart</h3>
            <p>Your trusted online grocery store with fresh products delivered to your doorstep.</p>
          </div>
          
          <div className="footer-section">
            <h4>Quick Links</h4>
            <Link to="/products">Products</Link>
            <Link to="/about">About Us</Link>
            <Link to="/pripol">Privacy Policy</Link>
            <Link to="/terms">Terms & Conditions</Link>
          </div>
          
          <div className="footer-section">
            <h4>Contact Info</h4>
            <p>Email: xxx@gmail.com</p>
            <p>Phone: 1234567890</p>
            <p>Address: Tamilnadu</p>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; 2025 FreshMart. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;