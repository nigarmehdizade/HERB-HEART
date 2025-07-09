import mongoose from 'mongoose';

const snackSchema = new mongoose.Schema({
  title: { type: String, required: true },
  image: { type: String, required: true },
  hoverImage: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  description: { type: String },
  ingredients: { type: [String], required: true } 
}, {
  timestamps: true
});

const Snack = mongoose.model('Snack', snackSchema);
export default Snack;
