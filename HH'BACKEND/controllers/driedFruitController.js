import DriedFruit from '../models/driedFruitModel.js';

export const createDriedFruit = async (req, res) => {
  try {
    const dried = await DriedFruit.create(req.body);
    res.status(201).json(dried);
  } catch (err) {
    res.status(400).json({ message: 'Əlavə edilə bilmədi', error: err.message });
  }
};

export const getAllDriedFruits = async (req, res) => {
  try {
    const dried = await DriedFruit.find();
    res.status(200).json(dried);
  } catch (err) {
    res.status(500).json({ message: 'Tapılmadı', error: err.message });
  }
};

export const getDriedFruitById = async (req, res) => {
  try {
    const dried = await DriedFruit.findById(req.params.id);
    if (!dried) return res.status(404).json({ message: 'Tapılmadı' });
    res.json(dried);
  } catch (err) {
    res.status(500).json({ message: 'Xəta baş verdi', error: err.message });
  }
};
