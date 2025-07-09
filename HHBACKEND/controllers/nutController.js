import Nut from '../models/nutModel.js';

export const getAllNuts = async (req, res) => {
  try {
    let sortOption = {};
    const sort = req.query.sort;

    if (sort === 'az') {
      sortOption = { name: 1 }; // A-Z
    } else if (sort === 'za') {
      sortOption = { name: -1 }; // Z-A
    } else if (sort === 'priceLowHigh') {
      sortOption = { price: 1 };
    } else if (sort === 'priceHighLow') {
      sortOption = { price: -1 };
    } else {
      sortOption = { createdAt: -1 }; // Featured (default)
    }

    const nuts = await Nut.find().sort(sortOption);
    res.status(200).json(nuts);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch nuts', error: err.message });
  }
};

export const getNutById = async (req, res) => {
  try {
    const nut = await Nut.findById(req.params.id);
    if (!nut) {
      return res.status(404).json({ message: 'Nut not found' });
    }
    res.status(200).json(nut);
  } catch (err) {
    res.status(500).json({ message: 'Error getting nut', error: err.message });
  }
};


export const createNut = async (req, res) => {
  try {
    const nut = await Nut.create(req.body);
    res.status(201).json(nut);
  } catch (err) {
    res.status(400).json({ message: 'Failed to create nut', error: err.message });
  }
};
