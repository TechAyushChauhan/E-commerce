const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', 
    required: true,
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
  },
  quantity: {
    type: Number,
  },
  price: {
    type: Number,
  },
  orderdate: {
    type: Date,
    default: Date.now,
  },
});

const CartItems = mongoose.model('CartItems', cartSchema);

module.exports = CartItems;
