const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
  orderitem_id: { type: String, required: true, unique: true },
  order_id: { type: String, required: true },
  product_id: { type: String, required: true },
  product_name: { type: String},
  quantity: { type: Number, required: true },
  unit_price: { type: Number, required: true }
}, {
  timestamps: true,
  collection: 'orderItems'
});

module.exports = mongoose.model('OrderItem', orderItemSchema);
