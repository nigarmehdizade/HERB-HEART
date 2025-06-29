import Snack from '../models/snackModel.js';


export const createSnack = async (req, res) => {
  try {
    const snack = await Snack.create(req.body);
    res.status(201).json(snack);
  } catch (err) {
    res.status(400).json({ message: 'Məhsul əlavə edilə bilmədi', error: err.message });
  }
};


export const getAllSnacks = async (req, res) => {
  try {
    const { sort } = req.query;

    let sortOption = {};
    if (sort === 'priceAsc') sortOption = { price: 1 };
    else if (sort === 'priceDesc') sortOption = { price: -1 };
    else sortOption = {}; 

    const snacks = await Snack.find().sort(sortOption);
    res.status(200).json(snacks);
  } catch (err) {
    res.status(500).json({ message: 'Məhsullar tapılmadı', error: err.message });
  }
};


export const getSnackById = async (req, res) => {
  try {
    const snack = await Snack.findById(req.params.id);
    if (!snack) return res.status(404).json({ message: 'Tapılmadı' });
    res.json(snack);
  } catch (err) {
    res.status(500).json({ message: 'Xəta baş verdi', error: err.message });
  }
};
