import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const userStr = localStorage.getItem("user");
      if (userStr) {
        const parsed = JSON.parse(userStr);
        if (parsed && typeof parsed === "object") {
          setUser(parsed);
        }
      }
    } catch (err) {
      console.error("❌ Navbar load error:", err);
      localStorage.removeItem("user");
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow px-6 py-3 flex justify-between items-center font-body">
      {/* Logo */}
      <Link to="/" className="font-title text-xl text-blue-600">
        myappy
      </Link>

      {/* เมนูกลาง */}
      <div className="space-x-4">
        <Link to="/listings">Listings</Link>
        <Link to="/sell">Sell</Link>
        <Link to="/buy">Buy</Link>
        <Link to="/pay">Pay</Link>
        <Link to="/research">Research</Link>
      </div>

      {/* User info */}
      <div className="flex items-center space-x-3">
        {user ? (
          <>
            {/* Avatar → ไป Profile */}
            <Link to="/profile" className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center">
                {user.name ? user.name.charAt(0).toUpperCase() : "U"}
              </div>
              <span className="text-gray-700">{user.name}</span>
            </Link>

            {/* Logout */}
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
            >
              Logout
            </button>
          </>
        ) : (
          <Link
            to="/login"
            className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}

