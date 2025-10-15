import mongoose from "mongoose";

const cartSchema = new mongoose.Schema(
  {
    cart_id: { type: String, required: true, unique: true },
    user_id: { type: String, required: true },
  },
  {
    timestamps: true,
    collection: "carts",
  }
);

const Cart = mongoose.model("Cart", cartSchema);
export default Cart;
