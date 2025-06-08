import User from "../models/User.js";

export const getUserProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    next(err);
  }
};

export const updateUserProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.address = req.body.address || user.address;
    user.contact = req.body.contact || user.contact;
    user.card = req.body.card || user.card;

    const updated = await user.save();
    res.json(updated);
  } catch (err) {
    next(err);
  }
};
