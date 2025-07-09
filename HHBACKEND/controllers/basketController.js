import Basket from "../models/basketModel.js";

export const getBasket = async (req, res, next) => {
  try {
    const basket = await Basket.findOne({ userId: req.user._id }).populate("items.productId");
    res.json(basket || { items: [] });
  } catch (err) {
    next(err);
  }
};

export const addToBasket = async (req, res, next) => {
  try {
    const { productId } = req.body;
    const basket = await Basket.findOne({ userId: req.user._id }) || new Basket({ userId: req.user._id, items: [] });

    const existingItem = basket.items.find(item => item.productId.toString() === productId);
    if (existingItem) existingItem.quantity++;
    else basket.items.push({ productId });

    await basket.save();
    res.status(201).json(basket);
  } catch (err) {
    next(err);
  }
};

export const removeFromBasket = async (req, res, next) => {
  try {
    const { productId } = req.body;
    const basket = await Basket.findOne({ userId: req.user._id });
    basket.items = basket.items.filter(item => item.productId.toString() !== productId);
    await basket.save();
    res.json(basket);
  } catch (err) {
    next(err);
  }
};