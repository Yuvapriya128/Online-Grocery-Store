import React, { useEffect, useState } from "react";
import axios from "../axios";
import "./Cart.css";

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);

  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user ? user.User_ID : null;

  useEffect(() => {
    if (userId) fetchCart();
  }, [userId]);

  const fetchCart = async () => {
    try {
      const res = await axios.get(`/cart/${userId}`);
      setCartItems(res.data.CartItems || []);
    } catch (err) {
      console.error("Error fetching cart:", err);
    }
  };

  const removeItem = async (itemId) => {
    try {
      await axios.delete(`/cart/${userId}/remove/${itemId}`);
      fetchCart();
    } catch (err) {
      console.error("Error removing item:", err);
    }
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.total_price, 0);
  const tax = subtotal * 0.08;
  const shipping = subtotal > 50 ? 0 : 5.99;
  const total = subtotal + tax + shipping;

  return (
    <div className="cart-page">
      <h2>Your Cart</h2>

      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <div className="cart-items">
          {cartItems.map((item) => (
            <div key={item.cartitem_id} className="cart-item">
              <h3>{item.product_name}</h3>
              <p>Qty: {item.quantity}</p>
              <p>Price: ₹{item.total_price}</p>
              <button onClick={() => removeItem(item.cartitem_id)}>Remove</button>
            </div>
          ))}
        </div>
      )}

      {cartItems.length > 0 && (
        <div className="cart-summary">
          <p>Subtotal: ₹{subtotal.toFixed(2)}</p>
          <p>Tax: ₹{tax.toFixed(2)}</p>
          <p>Shipping: {shipping === 0 ? "Free" : `₹${shipping.toFixed(2)}`}</p>
          <h3>Total: ₹{total.toFixed(2)}</h3>
        </div>
      )}
    </div>
  );
};

export default Cart;
