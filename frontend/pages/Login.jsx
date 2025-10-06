import { useState, useEffect } from "react";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("🔴 Offline");
  const [message, setMessage] = useState("");
  const [token, setToken] = useState(null);

  const [orders, setOrders] = useState([]);
  const [cart, setCart] = useState([]);
  const [results, setResults] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  const GOOGLE_API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;
  const GOOGLE_CX = import.meta.env.VITE_GOOGLE_CX;

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:4000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("token", data.token);
        setToken(data.token);
        setStatus("🟢 Online");
        setMessage("✅ Login success");
      } else {
        setMessage("❌ " + data.message);
      }
    } catch (err) {
      setMessage("Server error");
    }
  };

  const fetchOrders = async () => {
    try {
      const res = await fetch("http://localhost:4000/api/orders", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok) setOrders(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const cartData = JSON.parse(localStorage.getItem("cart") || "[]");
    setCart(cartData);
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchInput.trim()) return;
    try {
      const url = `https://www.googleapis.com/customsearch/v1?key=${GOOGLE_API_KEY}&cx=${GOOGLE_CX}&q=${encodeURIComponent(
        searchInput
      )}`;
      const res = await fetch(url);
      const data = await res.json();
      setResults(data.items || []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (token) fetchOrders();
  }, [token]);

  return (
    <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-lg p-6 mt-10">
      <h2 className="text-2xl font-bold text-deepblue mb-4">🔑 Login Page</h2>
      <p className="mb-4">สถานะปัจจุบัน: {status}</p>

      {!token ? (
        <form onSubmit={handleLogin} className="space-y-4 mb-6">
          <input
            type="email"
            placeholder="Email"
            className="w-full p-2 border rounded-md"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-2 border rounded-md"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="submit"
            className="w-full bg-deepblue text-white py-2 rounded-md hover:bg-peach"
          >
            Login
          </button>
        </form>
      ) : (
        <>
          <h3 className="text-xl font-semibold mt-6 mb-2">📋 สินค้าที่ชำระเรียบร้อย</h3>
          <table className="w-full border mb-6">
            <thead className="bg-peach text-white">
              <tr>
                <th className="p-2">สินค้า</th>
                <th className="p-2">ราคา</th>
                <th className="p-2">สถานะ</th>
              </tr>
            </thead>
            <tbody>
              {orders.length > 0 ? (
                orders.map((o, i) => (
                  <tr key={i} className="border-t">
                    <td className="p-2">{o.product}</td>
                    <td className="p-2">{o.price} ฿</td>
                    <td className="p-2">{o.status}</td>
                  </tr>
                ))
              ) : (
                <tr><td colSpan="3" className="p-2 text-center">ยังไม่มีคำสั่งซื้อ</td></tr>
              )}
            </tbody>
          </table>

          <h3 className="text-xl font-semibold mb-2">🛒 สินค้าในตะกร้า</h3>
          <ul className="border p-3 mb-6">
            {cart.length > 0 ? (
              cart.map((c, i) => (
                <li key={i}>{c.name} - {c.price} ฿</li>
              ))
            ) : (
              <p className="text-gray-500">ไม่มีสินค้าในตะกร้า</p>
            )}
          </ul>

          <h3 className="text-xl font-semibold mb-2">🔍 Research สินค้า</h3>
          <form onSubmit={handleSearch} className="flex gap-2 mb-4">
            <input
              type="text"
              placeholder="ค้นหาสินค้า..."
              className="flex-1 p-2 border rounded-md"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
            <button type="submit" className="px-4 bg-deepblue text-white rounded-md">
              ค้นหา
            </button>
          </form>
          {results.length > 0 && (
            <ul className="space-y-2">
              {results.map((r, i) => (
                <li key={i} className="border p-2 rounded-md">
                  <a href={r.link} target="_blank" className="text-blue-600 font-semibold">
                    {r.title}
                  </a>
                  <p className="text-sm text-gray-600">{r.snippet}</p>
                </li>
              ))}
            </ul>
          )}
        </>
      )}

      {message && <p className="mt-4 text-red-500">{message}</p>}
    </div>
  );
}

export default Login;
