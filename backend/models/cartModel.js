const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  cart_id: { type: String, required: true, unique: true },
  user_id: { type: String, required: true }
}, {
  timestamps: true,
  collection: 'carts'
});

module.exports = mongoose.model('Cart', cartSchema);
