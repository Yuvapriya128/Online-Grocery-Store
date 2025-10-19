import React, { useEffect, useState } from "react";
import axios from "../axios";
import "./OrdersPage.css";

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user ? user.User_ID : null;

  useEffect(() => {
    if (userId) fetchOrders();
  }, [userId]);

  const fetchOrders = async () => {
    try {
      const res = await axios.get(`/orders/${userId}`);
      setOrders(res.data);
    } catch (err) {
      console.error("Error fetching orders:", err);
    }
  };

  return (
    <div className="orders-page">
      <h2>My Orders</h2>
      {orders.length === 0 ? (
        <p>No orders placed yet</p>
      ) : (
        orders.map((order) => (
          <div key={order.Order_ID} className="order-card">
            <h3>Order ID: {order.Order_ID}</h3>
            <p>Status: {order.Status}</p>
            <p>Total Amount: ₹{order.Total_Amount}</p>
            <h4>Items:</h4>
            <ul>
              {order.Items.map((item) => (
                <li key={item.Product_ID}>
                  {item.Product_ID} - Qty: {item.Quantity} - ₹{item.Unit_Price} each
                </li>
              ))}
            </ul>
          </div>
        ))
      )}
    </div>
  );
};

export default OrdersPage;
