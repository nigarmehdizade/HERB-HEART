import NutReview from '../models/nutReviewModel.js';


export const createNutReview = async (req, res) => {
  try {
    const review = await NutReview.create(req.body);
    res.status(201).json(review);
  } catch (err) {
    res.status(400).json({ message: 'Rəy əlavə edilə bilmədi', error: err.message });
  }
};


export const getReviewsByNutId = async (req, res) => {
  try {
    const reviews = await NutReview.find({ nutId: req.params.nutId }).sort({ date: -1 });
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ message: 'Rəylər tapılmadı', error: err.message });
  }
};


export const deleteReview = async (req, res) => {
  try {
    const deleted = await NutReview.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Rəy tapılmadı' });
    res.json({ message: 'Rəy silindi' });
  } catch (err) {
    res.status(500).json({ message: 'Silinmə zamanı xəta', error: err.message });
  }
};
