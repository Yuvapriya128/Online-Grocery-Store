import React from 'react';
import { Link } from 'react-router-dom';
import './OrderConfirmation.css';

const OrderConfirmation = () => {
  const orderDetails = {
    orderNumber: 'FRM-2024-12345',
    orderDate: new Date().toLocaleDateString(),
    estimatedDelivery: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toLocaleDateString(),
    items: [
      { name: 'Fresh Apples', quantity: 2, price: 2.99 },
      { name: 'Organic Bananas', quantity: 1, price: 1.99 }
    ],
    shippingAddress: {
      name: 'John Doe',
      address: '123 Main Street',
      city: 'New York',
      state: 'NY',
      zipCode: '10001'
    },
    paymentMethod: 'Credit Card ending in 1234',
    subtotal: 7.97,
    tax: 0.64,
    shipping: 5.99,
    total: 14.60
  };

  return (
    <div className="confirmation-page">
      <div className="container">
        <div className="confirmation-card">
          <div className="confirmation-header">
            <div className="success-icon">✓</div>
            <h1>Order Confirmed!</h1>
            <p className="order-number">Order #{orderDetails.orderNumber}</p>
            <p className="confirmation-message">
              Thank you for your order. We've received it and are preparing it for delivery.
            </p>
          </div>

          <div className="confirmation-details">
            <div className="detail-section">
              <h3>Order Summary</h3>
              <div className="order-items">
                {orderDetails.items.map((item, index) => (
                  <div key={index} className="order-item">
                    <span>{item.name} × {item.quantity}</span>
                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              <div className="order-totals">
                <div className="total-row">
                  <span>Subtotal:</span>
                  <span>${orderDetails.subtotal.toFixed(2)}</span>
                </div>
                <div className="total-row">
                  <span>Tax:</span>
                  <span>${orderDetails.tax.toFixed(2)}</span>
                </div>
                <div className="total-row">
                  <span>Shipping:</span>
                  <span>${orderDetails.shipping.toFixed(2)}</span>
                </div>
                <div className="total-row grand-total">
                  <span>Total:</span>
                  <span>${orderDetails.total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            <div className="detail-grid">
              <div className="detail-item">
                <h4>Shipping Address</h4>
                <p>{orderDetails.shippingAddress.name}</p>
                <p>{orderDetails.shippingAddress.address}</p>
                <p>
                  {orderDetails.shippingAddress.city}, {orderDetails.shippingAddress.state} {orderDetails.shippingAddress.zipCode}
                </p>
              </div>

              <div className="detail-item">
                <h4>Estimated Delivery</h4>
                <p>{orderDetails.estimatedDelivery}</p>
              </div>

              <div className="detail-item">
                <h4>Payment Method</h4>
                <p>{orderDetails.paymentMethod}</p>
              </div>

              <div className="detail-item">
                <h4>Order Date</h4>
                <p>{orderDetails.orderDate}</p>
              </div>
            </div>
          </div>

          <div className="confirmation-actions">
            <Link to="/products" className="btn-primary">
              Continue Shopping
            </Link>
            <Link to="/" className="btn-secondary">
              Back to Home
            </Link>
          </div>

          <div className="support-note">
            <p>
              Need help? Contact our support team at <strong>support@freshmart.com</strong> 
              or call us at <strong>+1 (555) 123-4567</strong>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;