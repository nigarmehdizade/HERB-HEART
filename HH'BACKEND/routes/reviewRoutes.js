const express = require('express');
const router = express.Router();
const Review = require('../models/Review');

router.post('/', async (req, res) => {
  try {
    const review = new Review(req.body);
    const saved = await review.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ error: 'Rəy əlavə edilə bilmədi.' });
  }
});


router.get('/', async (req, res) => {
  const { productId } = req.query;
  try {
    const reviews = await Review.find({ productId }).sort({ date: -1 });
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ error: 'Rəylər yüklənmədi.' });
  }
});

module.exports = router;
