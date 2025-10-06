import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import { createServer } from "http";
import { Server } from "socket.io";

import authRoutes from "./routes/authRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";

dotenv.config();
const app = express();
const httpServer = createServer(app);

// ✅ สร้าง Socket.IO server
const io = new Server(httpServer, {
  cors: { origin: "*" },
});

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/chat", chatRoutes);

// MongoDB connect
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ DB error:", err));

// Socket.IO Events
io.on("connection", (socket) => {
  console.log("🔌 User connected:", socket.id);

  socket.on("sendMessage", (msg) => {
    io.emit("receiveMessage", msg); // broadcast
  });

  socket.on("disconnect", () => {
    console.log("❌ User disconnected");
  });
});

const PORT = process.env.PORT || 4000;
httpServer.listen(PORT, () =>
  console.log(`🚀 Server running on port ${PORT}`)
);
