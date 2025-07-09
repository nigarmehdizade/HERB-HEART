import Order from "../models/orderModel.js";

export const createOrder = async (req, res, next) => {
  try {
    const order = new Order({ ...req.body, userId: req.user._id });
    await order.save();
    res.status(201).json(order);
  } catch (err) {
    next(err);
  }
};

export const getMyOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({ userId: req.user._id });
    res.json(orders);
  } catch (err) {
    next(err);
  }
};