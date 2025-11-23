import React from "react";
import Sidebar from "../components/Sidebar";
import { FaUsers, FaBox, FaShoppingCart, FaDollarSign } from "react-icons/fa";

const Dashboard = () => {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Dashboard content */}
      <div className="flex-1 bg-gray-100 p-8 overflow-auto">
        <h1 className="text-2xl font-bold mb-6 text-gray-700">Dashboard</h1>

        <div className="grid grid-cols-4 gap-3">

          {/* Card 1 */}
        <div className="bg-white shadow-lg rounded-xl p-5 flex items-center gap-4 border-l-4 border-blue-500 hover:shadow-xl transition">
            <FaUsers className="text-blue-500 text-4xl opacity-80" />
            <div>
              <p className="text-gray-500 text-sm font-medium">Total Customer</p>
              <p className="text-2xl font-bold text-gray-700">75</p>
            </div>
          </div>



          


          {/* Card 2 */}
          <div className="bg-white shadow-lg rounded-xl p-5 flex items-center gap-4 border-l-4 border-green-500 hover:shadow-xl transition">
            <FaBox className="text-green-500 text-4xl opacity-80" />
            <div>
              <p className="text-gray-500 text-sm font-medium">Total Rest</p>
              <p className="text-2xl font-bold text-gray-700">75</p>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-white shadow-lg rounded-xl p-5 flex items-center gap-4 border-l-4 border-yellow-500 hover:shadow-xl transition">
            <FaShoppingCart className="text-yellow-500 text-4xl opacity-80" />
            <div>
              <p className="text-gray-500 text-sm font-medium">New Orders</p>
              <p className="text-2xl font-bold text-gray-700">50</p>
            </div>
          </div>

          {/* Card 4 */}
          <div className="bg-white shadow-lg rounded-xl p-5 flex items-center gap-4 border-l-4 border-red-500 hover:shadow-xl transition">
            <FaDollarSign className="text-red-500 text-4xl opacity-80" />
            <div>
              <p className="text-gray-500 text-sm font-medium">Revenue</p>
              <p className="text-2xl font-bold text-gray-700">$1200</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Dashboard;
