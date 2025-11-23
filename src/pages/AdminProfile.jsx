import React from "react";
import { FaEdit,   FaSignOutAlt, FaUser, FaPhoneAlt, FaStar    } from "react-icons/fa";
import useAuth from "../context/AuthContext";
import profile from "../assets/images/profile.png";

const AdminProfile = () => {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8 relative">

        {/* Profile Image Section */}
        <div className="flex flex-col items-center">
          
          <div className="relative">
      { <img
    src={profile}
    alt="profile"
    className="w-20 h-20 object-contain rounded"
  /> }

            {/* Edit Icon */}
            <button className="absolute bottom-1 right-1 bg-blue-500 text-white p-2 rounded-full shadow hover:bg-blue-600 transition">
              <FaEdit size={14} />
            </button>
          </div>

          {/* Name */}
          <h2 className="text-xl font-semibold text-gray-800 mt-4">
            {user?.name || "Admin Name"}
          </h2>

          {/* Email Bubble */}
          <p className="mt-2 bg-blue-100 text-blue-600 px-4 py-1 rounded-xl text-sm">
            {user?.email || "email@example.com"}
          </p>
        </div>

        {/* Menu Section */}
        <div className="mt-8 space-y-4">

          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl hover:bg-gray-100 cursor-pointer transition">
            <div className="flex items-center space-x-3">
              <FaUser className="text-blue-500" />
              <span className="text-gray-700 font-medium">User Name</span>
            </div>
            <span className="text-gray-500">&gt;</span>
          </div>

          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl hover:bg-gray-100 cursor-pointer transition">
            <div className="flex items-center space-x-3">
              <FaPhoneAlt className="text-blue-500" />
              <span className="text-gray-700 font-medium">Phone</span>
            </div>
            <span className="text-gray-500">&gt;</span>
          </div>

          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl hover:bg-gray-100 cursor-pointer transition">
            <div className="flex items-center space-x-3">
              <FaStar    className="text-blue-500" />
              <span className="text-gray-700 font-medium">Status</span>
            </div>
            <span className="text-gray-500">&gt;</span>
          </div>

          

          <div
            onClick={logout}
            className="flex items-center justify-between p-3 bg-gray-50 rounded-xl hover:bg-red-50 cursor-pointer transition"
          >
            <div className="flex items-center space-x-3">
              <FaSignOutAlt className="text-red-500" />
              <span className="text-red-600 font-medium">Logout</span>
            </div>
            <span className="text-red-500">&gt;</span>
          </div>

        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
