import mongoose from "mongoose";

const itemSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    description: String,
    price: Number,
    image: String,
    country: String,
    province: String,
    district: String,
    subdistrict: String,
    village: String,
    location: String,
  },
  { timestamps: true }
);

const Item = mongoose.model("Item", itemSchema);
export default Item;
