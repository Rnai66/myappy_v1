import Chat from "../models/chatModel.js";

// ดึงประวัติการแชท
export const getChats = async (req, res) => {
  try {
    const chats = await Chat.find().sort({ createdAt: -1 }).limit(20);
    res.json(chats);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// บันทึกข้อความ
export const addChat = async (req, res) => {
  try {
    const { user, message } = req.body;
    const chat = await Chat.create({ user, message });
    res.status(201).json(chat);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
