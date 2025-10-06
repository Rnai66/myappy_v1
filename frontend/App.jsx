import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";

function Listing() {
  return <h2 className="p-6">📦 Listing Page</h2>;
}
function Research() {
  return <h2 className="p-6">🔍 Research Page</h2>;
}
function Buy() {
  return <h2 className="p-6">🛒 Buy Page</h2>;
}
function Pay() {
  return <h2 className="p-6">💳 Pay Page</h2>;
}
function LoginPage() {
  return <h2 className="p-6">🔑 Login Page</h2>;
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/register" element={<Register />} />
        <Route path="/listing" element={<Listing />} />
        <Route path="/research" element={<Research />} />
        <Route path="/buy" element={<Buy />} />
        <Route path="/pay" element={<Pay />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </Router>
  );
}

export default App;
