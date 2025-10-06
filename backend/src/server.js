import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";

// Routes
import authRoutes from "./routes/authRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";

// โหลดค่า .env
dotenv.config();

// ✅ ต้องประกาศก่อนใช้ app.use()
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

// MongoDB connect
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ DB error:", err));

// Start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
