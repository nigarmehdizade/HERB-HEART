
import Seed from '../models/seedsModel.js';

export const getAllSeeds = async (req, res) => {
  try {
    const { sort } = req.query;

    let sortOption = {};

    if (sort === 'priceAsc') sortOption.price = 1;
    else if (sort === 'priceDesc') sortOption.price = -1;
    else if (sort === 'rating') sortOption.rating = -1;

    const seeds = await Seed.find({}).sort(sortOption);
    res.json(seeds);
  } catch (error) {
    res.status(500).json({ message: 'Seeds fetch error', error });
  }
};

export const createSeed = async (req, res) => {
  try {
    const seed = new Seed(req.body);
    await seed.save();
    res.status(201).json(seed);
  } catch (error) {
    res.status(400).json({ message: 'Seed creation failed', error });
  }
};

export const getSeedById = async (req, res) => {
  try {
    const seed = await Seed.findById(req.params.id);
    if (!seed) return res.status(404).json({ message: "Seed not found" });
    res.json(seed);
  } catch (error) {
    res.status(400).json({ message: "Invalid ID or error", error });
  }
};
