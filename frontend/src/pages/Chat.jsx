import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function Chat() {
  const { token } = useAuth();
  const [messages, setMessages] = useState([]);
  const [msg, setMsg] = useState("");

  const fetchMessages = async () => {
    const res = await fetch("/api/chat");
    const data = await res.json();
    setMessages(data);
  };

  useEffect(() => {
    fetchMessages();
    const interval = setInterval(fetchMessages, 5000);
    return () => clearInterval(interval);
  }, []);

  const sendMessage = async () => {
    if (!token) return alert("Login first");
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ message: msg }),
    });
    const data = await res.json();
    setMessages([data, ...messages]);
    setMsg("");
  };

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h2 className="text-xl font-bold mb-4">💬 Chat</h2>
      <div className="space-y-2 mb-4 max-h-64 overflow-y-auto border p-2 rounded">
        {messages.map((m, i) => (
          <div key={i} className="p-1 border-b">
            <span className="font-semibold">{m.user}: </span>
            {m.message}
          </div>
        ))}
      </div>
      {token && (
        <div className="flex space-x-2">
          <input
            className="flex-1 border rounded px-2 py-1"
            value={msg}
            onChange={(e) => setMsg(e.target.value)}
            placeholder="Type a message..."
          />
          <button
            onClick={sendMessage}
            className="bg-green-600 text-white px-4 py-1 rounded"
          >
            Send
          </button>
        </div>
      )}
    </div>
  );
}
