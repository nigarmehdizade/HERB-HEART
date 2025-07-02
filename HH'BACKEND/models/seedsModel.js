// models/seedsModel.js
import mongoose from 'mongoose';

const seedSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  hoverImage: {
    type: String, 
  },
  gallery: {
    type: [String], 
    default: [],
  },
  price: {
    type: Number,
    required: true,
  },
  rating: {
    type: Number,
    default: 0,
  },
  reviews: {
    type: Number,
    default: 0,
  },
});

const Seed = mongoose.model('Seed', seedSchema);
export default Seed;
