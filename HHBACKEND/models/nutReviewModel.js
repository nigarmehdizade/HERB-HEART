import mongoose from 'mongoose';

const nutReviewSchema = new mongoose.Schema({
  nutId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Nut',
    required: true
  },
  name: { type: String, required: true },
  email: { type: String, required: true },
  title: { type: String },        
  comment: { type: String, required: true },
  rating: { type: Number, required: true },
  image: { type: String },           
  date: { type: Date, default: Date.now }
});

const NutReview = mongoose.model('NutReview', nutReviewSchema);
export default NutReview;
