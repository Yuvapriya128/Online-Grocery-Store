import Order from "../models/orderModel.js";
import OrderItem from "../models/orderItemModel.js";
import Cart from "../models/cartModel.js";
import CartItem from "../models/cartItemModel.js";
import Product from "../models/productModel.js";
import { v4 as uuidv4 } from "uuid";

// Place Order
export const placeOrder = async (req, res) => {
  try {
    const { User_ID, Address, Payment_Method } = req.body;

    const cart = await Cart.findOne({ user_id: User_ID });
    if (!cart) return res.status(404).json({ error: "Cart not found" });

    const cartItems = await CartItem.find({ cart_id: cart.cart_id });
    if (cartItems.length === 0)
      return res.status(400).json({ error: "Cart is empty" });

    const totalAmount = cartItems.reduce(
      (sum, item) => sum + item.total_price,
      0
    );

    const order = new Order({
      order_id: uuidv4(),
      user_id: User_ID,
      total_amount: totalAmount,
      status: "Placed",
    });
    await order.save();

    for (const item of cartItems) {
      const product = await Product.findOne({ product_id: item.product_id });
      const orderItem = new OrderItem({
        orderitem_id: uuidv4(),
        order_id: order.order_id,
        product_id: item.product_id,
        product_name: product ? product.product_name : "Unknown",
        quantity: item.quantity,
        unit_price: item.total_price / item.quantity,
      });
      await orderItem.save();
    }

    await CartItem.deleteMany({ cart_id: cart.cart_id });

    res.status(201).json({
      message: "Order placed successfully",
      Order: {
        Order_ID: order.order_id,
        User_ID,
        Total_Amount: order.total_amount,
        Status: order.status,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

// View All Orders
export const viewOrders = async (req, res) => {
  try {
    const { User_ID } = req.params;
    const orders = await Order.find({ user_id: User_ID });
    if (!orders.length)
      return res.status(404).json({ error: "Orders not found" });

    const result = [];
    for (const order of orders) {
      const items = await OrderItem.find({ order_id: order.order_id }).select(
        "-_id -__v"
      );
      result.push({
        Order_ID: order.order_id,
        Total_Amount: order.total_amount,
        Status: order.status,
        Items: items.map((i) => ({
          Product_ID: i.product_id,
          Quantity: i.quantity,
          Unit_Price: i.unit_price,
        })),
      });
    }

    res.status(200).json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

// Update Order Status
export const updateOrderStatus = async (req, res) => {
  try {
    const { Order_ID } = req.params;
    const { Status } = req.body;

    const order = await Order.findOne({ order_id: Order_ID });
    if (!order) return res.status(404).json({ error: "Order not found" });

    order.status = Status;
    await order.save();

    res.status(200).json({ message: "Order status updated" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};
