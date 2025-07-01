import mongoose from 'mongoose';

const driedFruitSchema = new mongoose.Schema({
  title: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  gallery: [String],
  sizes: [String],
  description: String,
  features: String,
  origin: String,
  ingredients: String,
  allergyInfo: String,
  certifications: String,
  code: String,
  reviews: Number
});

const DriedFruit = mongoose.model('DriedFruit', driedFruitSchema);
export default DriedFruit;
