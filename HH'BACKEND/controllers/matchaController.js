import Matcha from '../models/matchaModel.js';

// GET all matcha products
export const getAllMatcha = async (req, res) => {
  try {
    const sort = req.query.sort;

    let matchaList;
    if (sort === 'priceAsc') {
      matchaList = await Matcha.find().sort({ price: 1 });
    } else if (sort === 'priceDesc') {
      matchaList = await Matcha.find().sort({ price: -1 });
    } else if (sort === 'rating') {
      matchaList = await Matcha.find().sort({ rating: -1 });
    } else {
      matchaList = await Matcha.find();
    }

    res.json(matchaList);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// GET matcha by ID
export const getMatchaById = async (req, res) => {
  try {
    const matcha = await Matcha.findById(req.params.id);
    if (!matcha) return res.status(404).json({ message: 'Not found' });
    res.json(matcha);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// ✅ POST new matcha product
export const createMatcha = async (req, res) => {
  try {
    const newMatcha = new Matcha(req.body);
    const saved = await newMatcha.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: 'Creation failed', error: err.message });
  }
};
