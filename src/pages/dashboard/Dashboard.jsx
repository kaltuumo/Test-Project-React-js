import React from "react";
import { FaUsers, FaCheckCircle, FaTimesCircle, FaClock } from "react-icons/fa";
import Card from "../../components/ui/Card";
import GenderBarChart from "../dashboard/GenderBarChart";
import GenderPieChart from "../dashboard/GenderPieChart";
import useInvoice from "../../hooks/invoice/useInvoice";

const Dashboard = () => {
  const { invoices } = useInvoice();

  // Count totals
  const totalCustomers = invoices.length;
  const totalPaid = invoices.filter(i => i.status === "Paid").length;
  const totalUnpaid = invoices.filter(i => i.status === "Unpaid").length;
  const totalPending = invoices.filter(i => i.status === "Pending").length;

  const cards = [
    {
      icon: FaUsers,
      title: "Total Customers",
      value: totalCustomers,
      iconColor: "text-blue-500",
    },
    {
      icon: FaCheckCircle,
      title: "Paid",
      value: totalPaid,
      iconColor: "text-green-500",
    },
    {
      icon: FaTimesCircle,
      title: "Unpaid",
      value: totalUnpaid,
      iconColor: "text-red-500",
    },
    {
      icon: FaClock,
      title: "Pending",
      value: totalPending,
      iconColor: "text-yellow-500",
    },
  ];

  return (
    <div className="flex h-screen">
      <div className="flex-1 bg-gray-100 p-8 overflow-auto flex flex-col gap-6">
        <h1 className="text-2xl font-bold text-gray-700">Dashboard</h1>

        {/* Cards */}
        <div className="grid grid-cols-4 gap-3 mb-8">
          {cards.map((card, index) => (
            <Card key={index} {...card} />
          ))}
        </div>

        {/* Charts */}
        <div className="grid w-full grid-cols-2 gap-8">
          {/* Bar Chart */}
          <div className="bg-white p-4 rounded shadow">
            <GenderBarChart />
          </div>

          {/* Pie Chart */}
          <div className="bg-white p-4 rounded shadow">
            <GenderPieChart />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
