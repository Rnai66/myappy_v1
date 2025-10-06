import Message from "../models/messageModel.js";

// เพิ่มข้อความใหม่
export const addMessage = async (req, res) => {
  try {
    const { user, text } = req.body;
    const msg = await Message.create({ user, text });
    res.status(201).json(msg);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ดึงข้อความทั้งหมด
export const getMessages = async (req, res) => {
  try {
    const msgs = await Message.find().sort({ createdAt: -1 }).limit(20);
    res.json(msgs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
