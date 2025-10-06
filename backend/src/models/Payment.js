import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
  order: { type: mongoose.Schema.Types.ObjectId, ref: "Order", required: true },
  amount: { type: Number, required: true },
  method: { type: String, default: "mock" },  // mock, paypal, stripe, etc.
  status: { type: String, default: "unpaid" } // unpaid, paid, failed
}, { timestamps: true });

const Payment = mongoose.model("Payment", paymentSchema);

export default Payment;   // ✅ export default
