
import mongoose from 'mongoose';

const recipeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  image: { type: String, required: true },
  description: String,
  method: [String], 
  ingredients: [String],
  instructions: String,
}, {
  timestamps: true,
});

const Recipe = mongoose.model('Recipe', recipeSchema);
export default Recipe;
