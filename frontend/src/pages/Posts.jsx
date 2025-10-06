import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function Posts() {
  const { token } = useAuth();
  const [posts, setPosts] = useState([]);
  const [content, setContent] = useState("");

  useEffect(() => {
    fetch("/api/posts")
      .then((res) => res.json())
      .then(setPosts);
  }, []);

  const handlePost = async () => {
    if (!token) return alert("Please login first");
    const res = await fetch("/api/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ content }),
    });
    const data = await res.json();
    setPosts([data, ...posts]);
    setContent("");
  };

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h2 className="text-xl font-bold mb-4">📝 Posts</h2>
      {token && (
        <div className="flex space-x-2 mb-4">
          <input
            className="flex-1 border rounded px-2 py-1"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write something..."
          />
          <button
            onClick={handlePost}
            className="bg-blue-600 text-white px-4 py-1 rounded"
          >
            Post
          </button>
        </div>
      )}
      <div className="space-y-2">
        {posts.map((p, i) => (
          <div key={i} className="border-b pb-2">
            <p className="font-semibold">{p.user}</p>
            <p>{p.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
