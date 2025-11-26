import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode"; // Using named export in latest version
import api from "../api/api";
import { ApiConstants } from "../api/ApiConstants";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // ✅ Initialize state from localStorage
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  // Set axios authorization header
  useEffect(() => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common["Authorization"];
    }
  }, [token]);

  // Login function
  const login = async (email, password) => {
    try {
     const res = await api.post(`${ApiConstants.userEndpoint}/login`, {
      email,
      password,
    });


      // Decode JWT to get user info
      const decoded = jwtDecode(res.data.token);
      const userData = {
        userId: decoded.userId,
        fullname: decoded.fullname,
        email: decoded.email,
        phone: decoded.phone,
      };

      setToken(res.data.token);
      setUser(userData);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(userData));
    } catch (err) {
      throw err;
    }
  };
  
   const register = async (fullname, phone, email, password) => {  
     try {
      const res = await api.post(`${ApiConstants.userEndpoint}/signup`, {
      fullname,
      phone,
      email,
      password,
    });

    // Haddii backend uu success message soo celiyo kaliya
    return res.data;

  } catch (err) {
    console.error("REGISTER ERROR:", err.response?.data || err.message);
    throw err;
  }
};


  // Logout function
  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
