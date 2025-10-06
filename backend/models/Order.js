import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  buyer: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  seller: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  listing: { type: mongoose.Schema.Types.ObjectId, ref: "Listing", required: true },
  status: { type: String, default: "pending" }
}, { timestamps: true });

const Order = mongoose.model("Order", orderSchema);

export default Order;   // ✅ ใช้ default export
