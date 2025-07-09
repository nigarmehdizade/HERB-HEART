const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  productId: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String },
  rating: { type: Number, required: true },
  title: { type: String },
  comment: { type: String },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Review', reviewSchema);
