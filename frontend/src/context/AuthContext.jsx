import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [email, setEmail] = useState(localStorage.getItem("email"));

  const login = (newToken, newEmail) => {
    setToken(newToken);
    setEmail(newEmail);
    localStorage.setItem("token", newToken);
    localStorage.setItem("email", newEmail);
  };

  const logout = () => {
    setToken(null);
    setEmail(null);
    localStorage.removeItem("token");
    localStorage.removeItem("email");
  };

  return (
    <AuthContext.Provider value={{ token, email, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
