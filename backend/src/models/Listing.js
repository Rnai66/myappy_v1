import mongoose from "mongoose";

const listingSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  images: [String],
  seller: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
}, { timestamps: true });

const Listing = mongoose.model("Listing", listingSchema);

export default Listing;   // ✅ export default
