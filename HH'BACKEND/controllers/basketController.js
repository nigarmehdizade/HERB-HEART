import Basket from "../models/Basket.js";

export const getBasket = async (req, res, next) => {
  try {
    const basket = await Basket.findOne({ user: req.user.id }).populate("items.product");
    if (!basket) return res.status(404).json({ message: "Basket not found" });
    res.json(basket);
  } catch (err) {
    next(err);
  }
};

export const addToBasket = async (req, res, next) => {
  try {
    const { productId, quantity } = req.body;
    let basket = await Basket.findOne({ user: req.user.id });
    if (!basket) {
      basket = new Basket({ user: req.user.id, items: [] });
    }
    const itemIndex = basket.items.findIndex(item => item.product.toString() === productId);
    if (itemIndex > -1) {
      basket.items[itemIndex].quantity += quantity;
    } else {
      basket.items.push({ product: productId, quantity });
    }
    await basket.save();
    res.status(200).json(basket);
  } catch (err) {
    next(err);
  }
};

export const removeFromBasket = async (req, res, next) => {
  try {
    const { productId } = req.params;
    const basket = await Basket.findOne({ user: req.user.id });
    if (!basket) return res.status(404).json({ message: "Basket not found" });
    basket.items = basket.items.filter(item => item.product.toString() !== productId);
    await basket.save();
    res.json(basket);
  } catch (err) {
    next(err);
  }
};
