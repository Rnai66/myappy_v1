import express from "express";

const router = express.Router();

// ตัวอย่าง route สำหรับ posts
router.get("/", (req, res) => {
  res.json({ message: "📌 Get all posts" });
});

router.post("/", (req, res) => {
  const { title, content } = req.body;
  res.json({ message: "✅ Post created", post: { title, content } });
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  res.json({ message: `✏️ Post ${id} updated` });
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  res.json({ message: `🗑️ Post ${id} deleted` });
});

export default router;
