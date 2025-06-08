import Order from "../models/Order.js";

export const createOrder = async (req, res, next) => {
  try {
    const { items, address, contact, totalPrice } = req.body;
    const newOrder = new Order({
      user: req.user.id,
      items,
      address,
      contact,
      totalPrice
    });
    await newOrder.save();
    res.status(201).json(newOrder);
  } catch (err) {
    next(err);
  }
};

export const getUserOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({ user: req.user.id }).populate("items.product");
    res.json(orders);
  } catch (err) {
    next(err);
  }
};

export const updateOrderStatus = async (req, res, next) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;
    const order = await Order.findById(orderId);
    if (!order) return res.status(404).json({ message: "Order not found" });
    order.status = status;
    await order.save();
    res.json(order);
  } catch (err) {
    next(err);
  }
};
