import { Link, useLocation, useNavigate  } from "react-router-dom";
import { FaTachometerAlt, FaUser, FaUserPlus, FaSignOutAlt } from "react-icons/fa";
import logo from "../assets/images/logo.png";
import useAuth from "../context/AuthContext";
import { useState, useEffect } from "react";


const Sidebar = () => {
  const { logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate(); // ✅ Hook-ka waa gudaha component

  const [activePath, setActivePath] = useState("");
  useEffect(() => {
    if(location.pathname !== "/dashboard"){
      setActivePath(location.pathname);
    }
  }, [location.pathname]);

  const handleLinkClick = (path) => {
    setActivePath(path);
  };
   const handleLogout = () => {
  logout();          
  navigate("/login", { replace: true }); // ✅ replace prevents going back
};

  return (
    <div className="w-48 bg-gradient-to-b from-white-700 via-white-500 to-white-400 text-white p-5 flex flex-col">

         {/* Logo */}
<div className="flex items-center gap-1 mb-5">
  {/* <img
    src={logo}
    alt="Logo"
    className="w-20 h-20 object-contain rounded"
  /> */}
  <span className="font-bold text-md text-black">Bahdo Electricity</span>
  </div>



      {/* Menu */}
      <ul className="flex flex-col gap-2 flex-1">
      <li>
  <Link
    to="/dashboard"
    onClick={() => handleLinkClick("/dashboard")}
    className={`flex items-center gap-2 px-3 py-2 rounded transition text-sm text-black
      ${activePath === "/dashboard" ? "bg-blue-900 shadow-md" : "hover:bg-blue-800"}`}
  >
    <FaTachometerAlt className="text-black-500 opacity-70" /> Dashboard
  </Link>
</li>

  <li>
  <Link
    to="/admin-profile"
    onClick={() => handleLinkClick("/admin-profile")}
    className={`flex items-center gap-2 px-3 py-2 rounded transition text-sm text-black
      ${activePath === "/admin-profile" ? "bg-blue-900 shadow-md" : "hover:bg-blue-800"}`}
  >
    <FaUser className="text-black-500 opacity-70" /> User Profile
  </Link>
</li>

<li>
  <Link
    to="/register"
    onClick={() => handleLinkClick("/register")}
    className={`flex items-center gap-2 px-3 py-2 rounded transition text-sm text-black
      ${activePath === "/register" ? "bg-blue-900 shadow-md" : "hover:bg-blue-800"}`}
  >
    <FaUserPlus className="text-black-500 opacity-70" /> Register User
  </Link>
</li>

{/* Logout */}


      </ul>

      {/* Logout */}
      <button
        onClick={handleLogout}
        className="flex items-center gap-4 px-3 py-2 mt-5 bg-red-500 hover:bg-red-600 rounded transition"
      >
        <FaSignOutAlt /> Logout
      </button>
    </div>
  );
};

export default Sidebar;
