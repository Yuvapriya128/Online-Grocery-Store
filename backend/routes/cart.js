import express from "express";
import { viewCart, addItem, updateItem, removeItem, clearCart } from "../controllers/cartController.js";
import Cart from "../models/cartModel.js";
import { v4 as uuidv4 } from "uuid";

const router = express.Router();

// ✅ Create new cart route (only this one line is new)
router.post("/create", async (req, res) => {
  try {
    const { user_id } = req.body;
    const existing = await Cart.findOne({ user_id });
    if (existing) return res.status(200).json({ message: "Cart already exists" });

    const newCart = new Cart({
      cart_id: uuidv4(),
      user_id,
    });
    await newCart.save();
    res.status(201).json({ message: "Cart created successfully", cart: newCart });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create cart" });
  }
});

router.get("/:User_ID", viewCart);
router.post("/:User_ID/add", addItem);
router.put("/:CartItem_ID", updateItem);
router.delete("/:CartItem_ID", removeItem);
router.delete("/:User_ID/clear", clearCart);

export default router;
