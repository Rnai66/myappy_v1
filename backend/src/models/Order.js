import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  buyer: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  seller: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  listing: { type: mongoose.Schema.Types.ObjectId, ref: "Listing", required: true },
  status: { type: String, default: "pending" } // pending, paid, shipped, completed
}, { timestamps: true });

const Order = mongoose.model("Order", orderSchema);

export default Order;   // ✅ export default
