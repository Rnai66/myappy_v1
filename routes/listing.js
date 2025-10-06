const express = require("express");
const Listing = require("../models/Listing");
const auth = require("../middleware/auth");
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary"); // ✅ ต้อง import ให้ถูก
const cloudinary = require("../config/cloudinary");

const router = express.Router();

// Storage บน Cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "myappy/listings",
    allowed_formats: ["jpg", "png", "jpeg"],
  },
});

const upload = multer({ storage });

// ✅ Create listing (พร้อมอัปโหลดรูปภาพ)
router.post("/", auth, upload.single("image"), async (req, res) => {
  try {
    const listing = new Listing({
      title: req.body.title,
      description: req.body.description,
      price: req.body.price,
      category: req.body.category,
      imageUrl: req.file?.path, // Cloudinary จะส่ง URL กลับมาใน path
      owner: req.user,
    });

    await listing.save();
    res.status(201).json(listing);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
