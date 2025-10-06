import mongoose from "mongoose";

const orderSchema = mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    product: { type: String, required: true },
    price: { type: Number, required: true },
    status: { type: String, default: "paid" }
  },
  { timestamps: true }
);

const Order = mongoose.models.Order || mongoose.model("Order", orderSchema);
export default Order;
