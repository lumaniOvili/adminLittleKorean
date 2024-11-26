const mongoose = require('mongoose');

const menuSchema = new mongoose.Schema({
  title: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String },
  nutritionalInfo: { type: String, required: true },
  allergens: { type: String, required: true },
  imageUrl: { type: String },
});

module.exports = mongoose.model('Menu', menuSchema);  // Make sure the model name is 'Menu'
