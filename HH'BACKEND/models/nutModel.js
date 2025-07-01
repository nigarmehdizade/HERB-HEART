import mongoose from 'mongoose';

const nutSchema = new mongoose.Schema({
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
  ingredients: {
    type: [String], 
    required: true,
  },
  description: {
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
}, { timestamps: true });

const Nut = mongoose.model('Nut', nutSchema);
export default Nut;
