const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
  cartitem_id: { type: String, required: true, unique: true },
  cart_id: { type: String, required: true },
  product_id: { type: String, required: true },
  product_name: { type: String},
  quantity: { type: Number, required: true },
  total_price: { type: Number, required: true }
}, {
  timestamps: true,
  collection: 'cartItems'
});

module.exports = mongoose.model('CartItem', cartItemSchema);
