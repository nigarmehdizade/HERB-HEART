

import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String },
  rating: { type: Number, required: true },
  title: { type: String },
  comment: { type: String, required: true },
  image: { type: String }, 
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' }, 
  snackId: { type: mongoose.Schema.Types.ObjectId, ref: 'Snack' },    
  recipeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Recipe' }, 
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Comment', commentSchema);
