import React from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css';
import AboutUs from './AboutUs'; // adjust the path according to your file structure

const LandingPage = () => {
  return (
    <div className="landing-page">
      {/* Hero Section with Background Image */}
      <section className="hero">
        <div className="hero-overlay">
          <div className="container">
            <div className="hero-content">
              <h1>Fresh Groceries Delivered to Your Doorstep</h1>
              <p>Shop the freshest produce, dairy, and pantry essentials with free delivery on orders over 100 Rs.</p>
              <div className="hero-buttons">
                <Link to="/products" className="btn-primary">Shop Now</Link>
                <Link to="/about" className="btn-secondary">Learn More</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="container">
          <h2 className="section-title">Why Choose FreshMart?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🚚</div>
              <h3>Free Delivery</h3>
              <p>Free delivery on orders over 100 Rs. within the city</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🌱</div>
              <h3>Fresh Products</h3>
              <p>Daily fresh products sourced from local farms</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">💰</div>
              <h3>Best Prices</h3>
              <p>Competitive prices with weekly deals and discounts</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">⏰</div>
              <h3>24/7 Support</h3>
              <p>Round-the-clock customer support for your convenience</p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Preview */}
      <section className="categories-preview">
        <div className="container">
          <h2 className="section-title">Shop by Category</h2>
          <div className="categories-grid">
            <div className="category-card">
              <div className="category-image">🍎</div>
              <h3>Fruits</h3>
              <Link to="/products?category=Fruits" className="btn-secondary">Shop Fruits</Link>
            </div>
            <div className="category-card">
              <div className="category-image">🥦</div>
              <h3>Vegetables</h3>
              <Link to="/products?category=Vegetables" className="btn-secondary">Shop Vegetables</Link>
            </div>
            <div className="category-card">
              <div className="category-image">🥛</div>
              <h3>Dairy</h3>
              <Link to="/products?category=Dairy" className="btn-secondary">Shop Dairy</Link>
            </div>
            <div className="category-card">
              <div className="category-image">🍞</div>
              <h3>Bakery</h3>
              <Link to="/products?category=Bakery" className="btn-secondary">Shop Bakery</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;