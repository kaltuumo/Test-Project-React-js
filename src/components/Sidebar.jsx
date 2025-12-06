import { Link, useLocation, useNavigate  } from "react-router-dom";
import { FaTachometerAlt, FaUser, FaSignOutAlt, FaUserFriends, FaGlobe, FaPlus, FaMapMarkerAlt, FaHome  } from "react-icons/fa";
import { useAuth } from "../context/AuthContext"; 
import { useState, useEffect } from "react";


const Sidebar = () => {
  const { logout } = useAuth();
  const location = useLocation();

  const [activePath, setActivePath] = useState("");
  useEffect(() => {
    if(location.pathname !== "/dashboard"){
      setActivePath(location.pathname);
    }
  }, [location.pathname]);

  const handleLinkClick = (path) => {
    setActivePath(path);
  };
   const navigate = useNavigate();
 
 const handleLogout = () => {
  logout(); // nadiifi token/session-ka user-ka
  navigate("/", { replace: true }); // → login page, back button ma shaqeyn doono
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
    to="/user-profile"
    onClick={() => handleLinkClick("/user-profile")}
    className={`flex items-center gap-2 px-3 py-2 rounded transition text-sm text-black
      ${activePath === "/admin-profile" ? "bg-blue-900 shadow-md" : "hover:bg-blue-800"}`}
  >
    <FaUser className="text-black-500 opacity-70" /> User Profile
  </Link>
</li>

<li>
  {/* <Link
    to="/user-register"
    onClick={() => handleLinkClick("/user-register")}
    className={`flex items-center gap-2 px-3 py-2 rounded transition text-sm text-black
      ${activePath === "/user-register" ? "bg-blue-900 shadow-md" : "hover:bg-blue-800"}`}
  >
    <FaUserPlus className="text-black-500 opacity-70" /> Register User
  </Link> */}
  <Link
    to="/user-list"
    onClick={() => handleLinkClick("/user-list")}
    className={`flex items-center gap-2 px-3 py-2 rounded transition text-sm text-black
      ${activePath === "/user-list" ? "bg-blue-900 shadow-md" : "hover:bg-blue-800"}`}
  >
    <FaUserFriends  className="text-black-500 opacity-70" /> User List
  </Link>
   <Link
    to="/customer-list"
    onClick={() => handleLinkClick("/customer-list")}
    className={`flex items-center gap-2 px-3 py-2 rounded transition text-sm text-black
      ${activePath === "/customer-list" ? "bg-blue-900 shadow-md" : "hover:bg-blue-800"}`}
  >
    <FaPlus   className="text-black-500 opacity-70" /> Customer
  </Link>
  <Link
    to="/zone-list"
    onClick={() => handleLinkClick("/zone-list")}
    className={`flex items-center gap-2 px-3 py-2 rounded transition text-sm text-black
      ${activePath === "/zone-list" ? "bg-blue-900 shadow-md" : "hover:bg-blue-800"}`}
  >
    <FaGlobe   className="text-black-500 opacity-70" /> Zone
  </Link>
  <Link
    to="/area-list"
    onClick={() => handleLinkClick("/area-list")}
    className={`flex items-center gap-2 px-3 py-2 rounded transition text-sm text-black
      ${activePath === "/area-list" ? "bg-blue-900 shadow-md" : "hover:bg-blue-800"}`}
  >
    <FaMapMarkerAlt     className="text-black-500 opacity-70" /> Area
  </Link>
   <Link
    to="/house-list"
    onClick={() => handleLinkClick("/house-list")}
    className={`flex items-center gap-2 px-3 py-2 rounded transition text-sm text-black
      ${activePath === "/house-list" ? "bg-blue-900 shadow-md" : "hover:bg-blue-800"}`}
  >
    <FaHome className="text-black-500 opacity-70" /> Houses
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
