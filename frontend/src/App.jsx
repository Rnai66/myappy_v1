import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Chatbot from "./pages/Chatbot";
import Research from "./pages/Research";
import Sell from "./pages/Sell";
import Pay from "./pages/Pay";

function App() {
  return (
    <Router>
      <nav className="bg-deepblue text-white p-4 flex space-x-6 shadow-md">
        <Link className="hover:text-peach" to="/register">Register</Link>
        <Link className="hover:text-peach" to="/login">Login</Link>
        <Link className="hover:text-peach" to="/profile">Profile</Link>
        <Link className="hover:text-peach" to="/chatbot">Chatbot</Link>
        <Link className="hover:text-peach" to="/research">Research</Link>
        <Link className="hover:text-peach" to="/sell">Sell</Link>
        <Link className="hover:text-peach" to="/pay">Pay</Link>
      </nav>

      <div className="p-6">
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/chatbot" element={<Chatbot />} />
          <Route path="/research" element={<Research />} />
          <Route path="/sell" element={<Sell />} />
          <Route path="/pay" element={<Pay />} />
          <Route path="*" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

