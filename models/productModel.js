import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  product_id: { type: String, required: true, unique: true },
  product_name: { type: String, required: true },
  category: { type: String },
  price: { type: Number, required: true },
  image: { type: String },
  description: { type: String },
  in_stock: { type: Boolean, default: true },
}, { collection: "products" });

const Product = mongoose.model("Product", productSchema);
export default Product;
