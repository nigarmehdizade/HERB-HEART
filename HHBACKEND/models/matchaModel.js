import mongoose from 'mongoose';

const matchaSchema = new mongoose.Schema({
  name: String,
    hoverImage: { type: String, required: true },
  image: String,            
  gallery: [String],           
  hoverText: String,           
  description: String,
  price: Number,
  rating: Number,
  reviews: Number,
  code: String,
  certifications: String,
  features: String,
  origin: String,
  ingredients: String,
  allergyInfo: String,
  sizes: [String],
});

export default mongoose.model('Matcha', matchaSchema);
