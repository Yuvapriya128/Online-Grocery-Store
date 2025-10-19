// src/components/Cart.js
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // ✅ import
import axios from "../axios";
import "./Cart.css";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [message, setMessage] = useState("");
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [orderMessage, setOrderMessage] = useState("");

  const navigate = useNavigate(); // ✅ initialize navigate

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
      setMessage("Failed to load cart");
    }
  };

  const removeItem = async (cartItemId) => {
    try {
      await axios.delete(`/cart/${cartItemId}`);
      setMessage("Item removed successfully");
      fetchCart();
    } catch (err) {
      console.error("Error removing item:", err);
      setMessage("Failed to remove item");
    }
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.Total_Price, 0);
  const tax = subtotal * 0.08;
  const shipping = subtotal > 50 ? 0 : 5.99;
  const total = subtotal + tax + shipping;

  const placeOrder = async () => {
    if (!userId) return alert("Please login to place an order");
    if (!address) return alert("Please enter your address");

    try {
      await axios.post("/orders", {
        User_ID: userId,
        Address: address,
        Payment_Method: paymentMethod,
      });

      alert("Order Placed"); // ✅ after user clicks OK
      fetchCart(); // clear cart view

      navigate("/orders"); // ✅ go to OrdersPage
    } catch (err) {
      console.error(err);
      setOrderMessage("Failed to place order");
    }
  };

  return (
    <div className="cart-page">
      <h2>Your Cart</h2>

      {message && <p className="cart-message">{message}</p>}

      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          <div className="cart-items">
            {cartItems.map((item) => (
              <div key={item.CartItem_ID} className="cart-item">
                <h3>{item.Product_Name}</h3>
                <p>Qty: {item.Quantity}</p>
                <p>Price: ₹{item.Total_Price}</p>
                <button onClick={() => removeItem(item.CartItem_ID)}>Remove</button>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <p>Subtotal: ₹{subtotal.toFixed(2)}</p>
            <p>Tax: ₹{tax.toFixed(2)}</p>
            <p>Shipping: {shipping === 0 ? "Free" : `₹${shipping.toFixed(2)}`}</p>
            <h3>Total: ₹{total.toFixed(2)}</h3>
          </div>

          <div className="checkout-section">
            <input
              type="text"
              placeholder="Enter address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            <select
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
            >
              <option value="COD">Cash on Delivery</option>
              <option value="Online">Online Payment</option>
            </select>
            <button onClick={placeOrder}>Place Order</button>
            {orderMessage && <p>{orderMessage}</p>}
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
