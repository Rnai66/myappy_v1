import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
  const [isLogin, setIsLogin] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("🔴 Offline");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const endpoint = isLogin
        ? "http://localhost:4000/api/auth/login"
        : "http://localhost:4000/api/auth/register";

      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        if (isLogin) {
          // ✅ กรณี Login ปกติ
          localStorage.setItem("token", data.token);
          setStatus("🟢 Online");
          setMessage("✅ Login success");
          navigate("/profile");
        } else {
          // ✅ กรณี Register → Auto Login
          localStorage.setItem("token", data.token);
          setStatus("🟢 Online");
          setMessage("✅ Register & Login success");
          navigate("/profile");
        }
      } else {
        setMessage("❌ " + data.message);
      }
    } catch (err) {
      setMessage("Server error");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setStatus("🔴 Offline");
    setMessage("ออกจากระบบแล้ว");
  };

  return (
    <div className="max-w-lg mx-auto bg-white shadow-md rounded-lg p-6 mt-10">
      <h2 className="text-2xl font-bold text-deepblue mb-4">
        {isLogin ? "เข้าสู่ระบบ (Login)" : "สมัครสมาชิก (Register)"}
      </h2>

      <p className="mb-4 font-semibold">สถานะผู้ใช้: <span>{status}</span></p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Email</label>
          <input
            type="email"
            className="w-full p-2 border rounded-md"
            placeholder="กรอกอีเมล"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block mb-1">Password</label>
          <input
            type="password"
            className="w-full p-2 border rounded-md"
            placeholder="กรอกรหัสผ่าน"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-deepblue text-white py-2 rounded-md hover:bg-peach"
        >
          {isLogin ? "Login" : "Register"}
        </button>
      </form>

      {message && <p className="mt-4">{message}</p>}

      <div className="flex justify-between items-center mt-6">
        <button
          onClick={() => setIsLogin(!isLogin)}
          className="text-blue-600 underline"
        >
          {isLogin ? "ยังไม่มีบัญชี? สมัครสมาชิก" : "มีบัญชีแล้ว? เข้าสู่ระบบ"}
        </button>

        {status === "🟢 Online" && (
          <button
            onClick={handleLogout}
            className="px-3 py-1 bg-red-500 text-white rounded-md"
          >
            Logout
          </button>
        )}
      </div>
    </div>
  );
}

export default Register;
