const mongoose = require('mongoose');
const products = new mongoose.Schema({ 
    name:String,
    price:String,
    desc:String,
    img:String
  });
  
  const productsModel = mongoose.model('products', products);
  
  module.exports = productsModel;

