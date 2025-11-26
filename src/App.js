import React from "react";
import './index.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import UserProfile from "./pages/UserProfile";
import UserRegistration from "./pages/UserRegistration";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/user-profile" element={<UserProfile />} />
          <Route path="/user-register" element={<UserRegistration />} />

        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
