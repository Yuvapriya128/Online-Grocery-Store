const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  product_id: {
    type: String,
    required: true,
    unique: true
  },
  product_name: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  image: {
    type: String,
    required: false
  },
  description: {
    type: String,
    required: false
  },
  in_stock: {
    type: Boolean,
    default: true
  }
});

const Product = mongoose.model('Product', productSchema, 'products');

module.exports = Product;