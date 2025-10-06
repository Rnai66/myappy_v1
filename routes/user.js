const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const User = require("../models/User");

// ✅ GET profile ของ user ที่ล็อกอินอยู่
router.get("/me", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ UPDATE profile ของ user
router.put("/me", auth, async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.user, req.body, {
      new: true,
    }).select("-password");

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
