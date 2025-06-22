import User from "../models/userModel.js";

export const getProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    res.json(user);
  } catch (err) {
    next(err);
  }
};

export const updateProfile = async (req, res, next) => {
  try {
    const { name, email, phone, address, cardInfo } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      { name, email, phone, address, cardInfo },
      { new: true }
    ).select("-password");

    res.json(updatedUser);
  } catch (err) {
    next(err);
  }
};

