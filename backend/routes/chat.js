import express from "express";

const router = express.Router();

// ตัวอย่าง route สำหรับ chat
router.get("/", (req, res) => {
  res.json({ message: "💬 Chat endpoint ready" });
});

router.post("/", (req, res) => {
  const { from, to, message } = req.body;
  res.json({ message: "✅ Chat message sent", data: { from, to, message } });
});

export default router;
