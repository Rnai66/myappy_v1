import express from "express";
import Item from "../models/itemModel.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const filters = req.query;
    let query = {};
    if (filters.country) query.country = filters.country;
    if (filters.province) query.province = filters.province;
    if (filters.district) query.district = filters.district;
    if (filters.subdistrict) query.subdistrict = filters.subdistrict;
    if (filters.village) query.village = filters.village;

    const items = await Item.find(query).sort({ createdAt: -1 }).limit(30);
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
