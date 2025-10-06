import { useState } from "react";

export default function ChatPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages([...messages, { text: input, sender: "user" }]);
    setInput("");
    // TODO: call backend chatbot API แล้วเอาคำตอบมา push
    setMessages((prev) => [
      ...prev,
      { text: "📩 ขอบคุณสำหรับข้อความ ระบบจะตอบกลับเร็ว ๆ นี้", sender: "bot" },
    ]);
  };

  return (
    <div className="fixed bottom-4 right-4">
      {/* ปุ่มเปิดปิด */}
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-full shadow-lg"
        >
          💬 Chat
        </button>
      ) : (
        <div className="w-80 h-96 bg-white shadow-xl rounded-lg flex flex-col">
          <div className="p-3 bg-blue-600 text-white font-bold flex justify-between">
            <span>Chat Support</span>
            <button onClick={() => setIsOpen(false)}>✖</button>
          </div>
          <div className="flex-1 p-3 overflow-y-auto">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`mb-2 ${
                  msg.sender === "user" ? "text-right" : "text-left"
                }`}
              >
                <span
                  className={`inline-block px-3 py-2 rounded-lg ${
                    msg.sender === "user"
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-black"
                  }`}
                >
                  {msg.text}
                </span>
              </div>
            ))}
          </div>
          <div className="p-3 border-t flex">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="พิมพ์ข้อความ..."
              className="flex-1 border rounded px-2 py-1 mr-2"
            />
            <button
              onClick={handleSend}
              className="bg-blue-600 text-white px-3 py-1 rounded"
            >
              ส่ง
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
