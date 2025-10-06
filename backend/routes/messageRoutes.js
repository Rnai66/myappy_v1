import express from "express";
import { addMessage, getMessages } from "../controllers/messageController.js";

const router = express.Router();

router.post("/", addMessage);   // post ข้อความ
router.get("/", getMessages);   // ดึงข้อความทั้งหมด

export default router;
