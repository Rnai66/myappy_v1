import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
  const [isLogin, setIsLogin] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("🔴 Offline");
  const [users, setUsers] = useState([]);
  const [profile, setProfile] = useState(null);
  const navigate = useNavigate();

  const fetchUsers = async () => {
    try {
      const res = await fetch("http://localhost:4000/api/auth/users");
      const data = await res.json();
      if (res.ok) setUsers(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

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
          setMessage("✅ Login success");
          localStorage.setItem("token", data.token);
          setStatus("🟢 Online");
          setProfile(data.user || null);
          navigate("/buy");
        } else {
          setMessage("✅ Register success, please login now");
          setIsLogin(true);
        }
        fetchUsers();
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
    setProfile(null);
  };

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6 mt-10">
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

      <div className="mt-8 border-t pt-4">
        <h3 className="font-semibold text-deepblue mb-3">📋 ผู้ใช้งานทั้งหมด</h3>
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-300 rounded-md shadow-sm">
            <thead className="bg-peach text-white">
              <tr>
                <th className="p-2 text-left">Email</th>
                <th className="p-2 text-left">สถานะ</th>
                <th className="p-2 text-left">วันที่สมัคร</th>
              </tr>
            </thead>
            <tbody>
              {users.length > 0 ? (
                users.map((u, i) => (
                  <tr key={i} className="border-t hover:bg-gray-50">
                    <td className="p-2">{u.email}</td>
                    <td className="p-2">
                      {profile && u._id === profile._id ? status : "🔴 Offline"}
                    </td>
                    <td className="p-2">
                      {new Date(u.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="p-2 text-gray-500">
                    ไม่มีผู้ใช้
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Register;
