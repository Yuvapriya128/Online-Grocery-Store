import Cart from "../models/cartModel.js";
import CartItem from "../models/cartItemModel.js";
import Product from "../models/productModel.js";
import { v4 as uuidv4 } from "uuid";

const mapCartItems = async (cartItems) => {
  const result = [];
  for (let item of cartItems) {
    const product = await Product.findOne({ product_id: item.product_id });
    result.push({
      CartItem_ID: item.cartitem_id,
      Product_ID: item.product_id,
      Product_Name: product ? product.product_name : "Unknown",
      Quantity: item.quantity,
      Total_Price: item.total_price,
    });
  }
  return result;
};

// View Cart
export const viewCart = async (req, res) => {
  try {
    const { User_ID } = req.params;
    const cart = await Cart.findOne({ user_id: User_ID });
    if (!cart) return res.status(404).json({ error: "Cart not found" });

    const items = await CartItem.find({ cart_id: cart.cart_id });
    const cartItems = await mapCartItems(items);

    res.status(200).json({
      Cart_ID: cart.cart_id,
      User_ID: cart.user_id,
      CartItems: cartItems,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

// Add Item to Cart
// Add Item to Cart
export const addItem = async (req, res) => {
  try {
    const { User_ID } = req.params;
    const { Product_ID, Quantity } = req.body;

    // ✅ Find or create cart for user
    let cart = await Cart.findOne({ user_id: User_ID });
    if (!cart) {
      cart = new Cart({
        cart_id: uuidv4(),
        user_id: User_ID,
      });
      await cart.save();
      console.log(`New cart created for user ${User_ID}`);
    }

    // ✅ Find product
    const product = await Product.findOne({ product_id: Product_ID });
    if (!product) return res.status(404).json({ error: "Product not found" });

    // ✅ Check if cart item already exists
    let cartItem = await CartItem.findOne({
      cart_id: cart.cart_id,
      product_id: Product_ID,
    });

    if (cartItem) {
      cartItem.quantity += Quantity;
      cartItem.total_price = cartItem.quantity * product.price;
      await cartItem.save();

      return res.status(200).json({
        message: "Cart item updated",
        CartItem: {
          CartItem_ID: cartItem.cartitem_id,
          Product_ID: cartItem.product_id,
          Quantity: cartItem.quantity,
          Total_Price: cartItem.total_price,
        },
      });
    }

    // ✅ Create new cart item
    cartItem = new CartItem({
      cartitem_id: uuidv4(),
      cart_id: cart.cart_id,
      product_id: product.product_id,
      quantity: Quantity,
      total_price: Quantity * product.price,
    });

    await cartItem.save();

    res.status(201).json({
      message: "Item added to cart",
      CartItem: {
        CartItem_ID: cartItem.cartitem_id,
        Product_ID: product.product_id,
        Quantity: cartItem.quantity,
        Total_Price: cartItem.total_price,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};


// Update Cart Item Quantity
export const updateItem = async (req, res) => {
  try {
    const { CartItem_ID } = req.params;
    const { Quantity } = req.body;

    const cartItem = await CartItem.findOne({ cartitem_id: CartItem_ID });
    if (!cartItem) return res.status(404).json({ error: "Cart item not found" });

    const product = await Product.findOne({ product_id: cartItem.product_id });
    if (!product) return res.status(404).json({ error: "Product not found" });

    cartItem.quantity = Quantity;
    cartItem.total_price = Quantity * product.price;
    await cartItem.save();

    res.status(200).json({
      message: "Cart item updated",
      Total_Price: cartItem.total_price,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

// Remove Cart Item
export const removeItem = async (req, res) => {
  try {
    const { CartItem_ID } = req.params;
    const cartItem = await CartItem.findOneAndDelete({ cartitem_id: CartItem_ID });
    if (!cartItem) return res.status(404).json({ error: "Cart item not found" });

    res.status(200).json({ message: "Item removed from cart" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

// Clear Entire Cart
export const clearCart = async (req, res) => {
  try {
    const { User_ID } = req.params;
    const cart = await Cart.findOne({ user_id: User_ID });
    if (!cart) return res.status(404).json({ error: "Cart not found" });

    await CartItem.deleteMany({ cart_id: cart.cart_id });
    res.status(200).json({ message: "Cart cleared successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};
