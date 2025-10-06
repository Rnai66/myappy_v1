const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const authMiddleware = require("../middleware/authMiddleware");
const authRoutes = require("./routes/auth");
app.use("/api/auth", authRoutes);


module.exports = (db) => {
  const router = express.Router();
  const users = db.collection("users");
  const posts = db.collection("posts");
  const chats = db.collection("chats");

  // Register
  router.post("/auth/register", async (req, res) => {
    const { email, password } = req.body;
    const existing = await users.findOne({ email });
    if (existing) return res.status(400).json({ error: "User exists" });

    const hashed = await bcrypt.hash(password, 10);
    await users.insertOne({ email, password: hashed, createdAt: new Date() });
    res.json({ email });
  });

  // Login
  router.post("/auth/login", async (req, res) => {
    const { email, password } = req.body;
    const user = await users.findOne({ email });
    if (!user) return res.status(400).json({ error: "Invalid credentials" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ error: "Invalid credentials" });

    const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: "2h" });
    res.json({ token, email });
  });

  // Profile (protected)
  router.get("/profile", authMiddleware, async (req, res) => {
    const user = await users.findOne({ email: req.user.email }, { projection: { password: 0 } });
    res.json(user);
  });

  // Create Post
  router.post("/posts", authMiddleware, async (req, res) => {
    const { content } = req.body;
    const post = { user: req.user.email, content, createdAt: new Date() };
    await posts.insertOne(post);
    res.json(post);
  });

  // Get Posts
  router.get("/posts", async (req, res) => {
    const all = await posts.find().sort({ createdAt: -1 }).toArray();
    res.json(all);
  });

  // Send Chat
  router.post("/chat", authMiddleware, async (req, res) => {
    const { message } = req.body;
    const chat = { user: req.user.email, message, createdAt: new Date() };
    await chats.insertOne(chat);
    res.json(chat);
  });

  // Get Chat messages
  router.get("/chat", async (req, res) => {
    const msgs = await chats.find().sort({ createdAt: -1 }).limit(20).toArray();
    res.json(msgs);
  });

  return router;
};
