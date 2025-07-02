// server/controllers/fruitReviewController.js (səndə belə olmalıdır)
export const createReview = async (req, res) => {
  try {
    console.log("GƏLƏN BACKEND BODY:", req.body);
    const { name, email, title, comment, rating, image, fruitId } = req.body;
    if (!name || !email || !comment || !rating || !fruitId) {
      return res.status(400).json({ message: "Zəhmət olmasa bütün sahələri doldurun." });
    }

    const newReview = await FruitReview.create({
      name,
      email,
      title,
      comment,
      rating,
      image,
      fruitId
    });

    res.status(201).json(newReview);
  } catch (err) {
    res.status(500).json({ message: "Rəy əlavə olunmadı", error: err.message });
  }
};
    // controllers/fruitReviewController.js
export const deleteReview = async (req, res) => {
  try {
    const review = await FruitReview.findByIdAndDelete(req.params.id);
    if (!review) return res.status(404).json({ message: 'Rəy tapılmadı' });
    res.json({ message: 'Rəy silindi' });
  } catch (err) {
    res.status(500).json({ message: 'Silinərkən xəta baş verdi', error: err.message });
  }
};
// controllers/fruitReviewController.js

import FruitReview from '../models/FruitReview.js';

export const getReviewsByFruit = async (req, res) => {
  try {
    const reviews = await FruitReview.find({ fruitId: req.params.fruitId });
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ message: 'Rəylər alınmadı', error: err.message });
  }
};
