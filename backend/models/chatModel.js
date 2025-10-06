import mongoose from "mongoose";

const chatSchema = mongoose.Schema(
  {
    user: { type: String, required: true },
    message: { type: String, required: true },
  },
  { timestamps: true }
);

const Chat = mongoose.models.Chat || mongoose.model("Chat", chatSchema);
export default Chat;
