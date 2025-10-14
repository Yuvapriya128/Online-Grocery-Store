const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  order_id: { type: String, required: true, unique: true },
  user_id: { type: String, required: true },
  total_amount: { type: Number, required: true },
  status: { type: String, required: true }
}, {
  timestamps: true,
  collection: 'orders'
});

module.exports = mongoose.model('Order', orderSchema);
