// const Nut = require('../models/nutModel');

// const getAllNuts = async (req, res) => {
//   try {
//     const nuts = await Nut.find();
//     res.json(nuts);
//   } catch (err) {
//     res.status(500).json({ message: 'Server error' });
//   }
// };


// const getNutById = async (req, res) => {
//   try {
//     const nut = await Nut.findById(req.params.id);
//     if (!nut) return res.status(404).json({ message: 'Nut not found' });
//     res.json(nut);
//   } catch (err) {
//     res.status(500).json({ message: 'Server error' });
//   }
// };

// export default { getAllNuts, getNutById };
