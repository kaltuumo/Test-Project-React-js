import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Simple fake login (no UI validation here)
  const login = (email, password) => {
    // note: no validation in UI — backend/logic can check later
    if (email === "admin@gmail.com" && password === "123456") {
      setUser({ name: "Admin User", email });
      return true;
    }
    // return false when credentials wrong (logic only)
    return false;
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default function useAuth() {
  return useContext(AuthContext);
}
