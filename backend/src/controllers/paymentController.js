import Payment from "../models/Payment.js";
import Order from "../models/Order.js";

export const makePayment = async (req, res) => {
  try {
    const { orderId } = req.params;
    const order = await Order.findById(orderId);
    if (!order) return res.status(404).json({ message: "Order not found" });

    if (order.buyer.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    const payment = await Payment.create({
      order: order._id,
      amount: req.body.amount,
      method: req.body.method || "mock",
      status: "paid"
    });

    order.status = "paid";
    await order.save();

    res.status(201).json(payment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getMyPayments = async (req, res) => {
  const payments = await Payment.find()
    .populate({ path: "order", match: { buyer: req.user._id } });
  res.json(payments.filter(p => p.order !== null));
};
