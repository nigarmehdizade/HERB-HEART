import mongoose from 'mongoose';

const fruitReviewSchema = new mongoose.Schema({
  fruitId: { type: mongoose.Schema.Types.ObjectId, ref: 'DriedFruit', required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  title: String,
  comment: { type: String, required: true },
  rating: { type: Number, required: true },
  image: String
}, { timestamps: true });

const FruitReview = mongoose.model('FruitReview', fruitReviewSchema);
export default FruitReview;
