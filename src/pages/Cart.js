import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Cart.css';

const Cart = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Fresh Apples",
      price: 25,
      quantity: 2,
      image: "https://via.placeholder.com/100x100/2563eb/ffffff?text=Apples"
    },
    {
      id: 2,
      name: "Organic Bananas",
      price: 10,
      quantity: 1,
      image: "https://via.placeholder.com/100x100/2563eb/ffffff?text=Bananas"
    }
  ]);

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    setCartItems(items =>
      items.map(item =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = (id) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tax = subtotal * 0.08;
  const shipping = subtotal > 50 ? 0 : 5.99;
  const total = subtotal + tax + shipping;

  return (
    <div className="cart-page">
      <div className="container">
        <h1 className="section-title">Shopping Cart</h1>

        {cartItems.length === 0 ? (
          <div className="empty-cart">
            <h2>Your cart is empty</h2>
            <p>Add some delicious groceries to get started!</p>
            <Link to="/products" className="btn-primary">Start Shopping</Link>
          </div>
        ) : (
          <div className="cart-content">
            <div className="cart-items">
              {cartItems.map(item => (
                <div key={item.id} className="cart-item">
                  <div className="item-image">
                    <img src={item.image} alt={item.name} />
                  </div>
                  <div className="item-details">
                    <h3>{item.name}</h3>
                    <p className="item-price">{item.price} Rs.</p>
                  </div>
                  <div className="quantity-controls">
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="quantity-btn"
                    >
                      -
                    </button>
                    <span className="quantity">{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="quantity-btn"
                    >
                      +
                    </button>
                  </div>
                  <div className="item-total">
                    {(item.price * item.quantity).toFixed(2)} Rs.
                  </div>
                  <button 
                    onClick={() => removeItem(item.id)}
                    className="remove-btn"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>

            <div className="cart-summary">
              <h3>Order Summary</h3>
              <div className="summary-row">
                <span>Subtotal:</span>
                <span>{subtotal.toFixed(2)} Rs.</span>
              </div>
              <div className="summary-row">
                <span>Tax:</span>
                <span>{tax.toFixed(2)} Rs.</span>
              </div>
              <div className="summary-row">
                <span>Shipping:</span>
                <span>{shipping === 0 ? 'FREE' : `${shipping.toFixed(2)} Rs.`}</span>
              </div>
              <div className="summary-row total">
                <span>Total:</span>
                <span>{total.toFixed(2)} Rs.</span>
              </div>
              {subtotal < 50 && (
                <p className="free-shipping-note">
                  Add {(50 - subtotal).toFixed(2)} Rs. more for free shipping!
                </p>
              )}
              <Link to="/checkout" className="btn-primary checkout-btn">
                Proceed to Checkout
              </Link>
              <Link to="/products" className="btn-secondary">
                Continue Shopping
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;