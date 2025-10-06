import express from "express";
import { addMessage, getMessages } from "../controllers/messageController.js";

const router = express.Router();

// เพิ่มข้อความใหม่
router.post("/", addMessage);

// ดึงข้อความทั้งหมด
router.get("/", getMessages);

export default router;
