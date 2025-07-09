import DriedFruit from '../models/driedFruitModel.js';

// Create
export const createDriedFruit = async (req, res) => {
  try {
    const fruit = await DriedFruit.create(req.body);
    res.status(201).json(fruit);
  } catch (err) {
    res.status(400).json({ message: 'Əlavə edilə bilmədi', error: err.message });
  }
};

// controllers/driedFruitController.js

export const getAllDriedFruits = async (req, res) => {
  const sort = req.query.sort;

  let sortOption = {};
  if (sort === 'price-asc') sortOption = { price: 1 };
  else if (sort === 'price-desc') sortOption = { price: -1 };
  else if (sort === 'date-new') sortOption = { createdAt: -1 };
  else if (sort === 'date-old') sortOption = { createdAt: 1 };

  const fruits = await DriedFruit.find({}).sort(sortOption);
  res.json(fruits);
};


// Get by ID
export const getDriedFruitById = async (req, res) => {
  try {
    const fruit = await DriedFruit.findById(req.params.id);
    if (!fruit) return res.status(404).json({ message: 'Tapılmadı' });
    res.json(fruit);
  } catch (err) {
    res.status(500).json({ message: 'Xəta baş verdi', error: err.message });
  }
};

// Add Review
export const addDriedFruitReview = async (req, res) => {
  const { name, email, title, comment, rating } = req.body;

  try {
    const fruit = await DriedFruit.findById(req.params.id);
    if (!fruit) return res.status(404).json({ message: 'Məhsul tapılmadı' });

    const newReview = { name, email, title, comment, rating };
    fruit.reviews.push(newReview);
    await fruit.save();

    res.status(201).json({ message: 'Rəy əlavə olundu', review: newReview });
  } catch (err) {
    res.status(500).json({ message: 'Rəy əlavə edilə bilmədi', error: err.message });
  }
};

// Delete Review
export const deleteDriedFruitReview = async (req, res) => {
  const { reviewId } = req.params;

  try {
    const fruit = await DriedFruit.findById(req.params.id);
    if (!fruit) return res.status(404).json({ message: 'Məhsul tapılmadı' });

    fruit.reviews = fruit.reviews.filter(r => r._id.toString() !== reviewId);
    await fruit.save();

    res.json({ message: 'Rəy silindi' });
  } catch (err) {
    res.status(500).json({ message: 'Silinmədi', error: err.message });
  }
};
