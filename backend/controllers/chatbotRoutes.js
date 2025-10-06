import express from "express";
import { chatbotResponse } from "../controllers/chatbotController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, chatbotResponse);

export default router;
