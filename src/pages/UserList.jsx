import React, { useEffect, useState } from "react";
import Button from "../components/ui/Button";
import InputField from "../components/ui/input";
import Label from "../components/ui/Label";
import { useNavigate } from "react-router-dom";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  // SAMPLE DATA
  const sampleUsers = [
    {
      userId: "6925a7fb8a2ecf92cb6059ca",
      fullname: "Kaltuumo",
      email: "kaltuumo905@gmail.com",
      phone: "619050040",
      createdDate: "2025-11-25",
    },
    {
      userId: "6926f1a21f1c3bd56ac989c9",
      fullname: "Osob",
      email: "osob@gmail.com",
      phone: "618337700",
      createdDate: "2025-11-26",
    },
    {
      userId: "6927633e7172223fffd856c6",
      fullname: "Salma",
      email: "salma@gmail.com",
      phone: "619972392",
      createdDate: "2025-11-26",
    },
    {
      userId: "6927664a7172223fffd856cb",
      fullname: "Abdiwali",
      email: "abdi@gmail.com",
      phone: "617890987",
      createdDate: "2025-11-26",
    },
    {
      userId: "692766b87172223fffd856d1",
      fullname: "Nor",
      email: "nor@gmail.com",
      phone: "617890984",
      createdDate: "2025-11-26",
    },
  ];

  useEffect(() => {
    setUsers(sampleUsers);
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Title */}
      <h1 className="text-3xl font-bold mb-6 text-white bg-gradient-to-r from-blue-500 to-indigo-600 p-4 rounded-lg shadow-lg">
        Users List
      </h1>

      {/* Search + Add */}
      <div className="mb-6 w-full flex items-end justify-between gap-4">
        {/* Search */}
        <div className="flex-1">
          <Label text="Search User" />
          <InputField
            placeholder="Search by fullname..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Add User Button */}
        <div className="flex flex-col justify-end">
          <Button
            onClick={() => navigate("/user-register")}
            className="w-auto px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-semibold shadow-lg"
          >
            Add New User
          </Button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto shadow-lg rounded-lg border border-gray-300">
        <table  className="min-w-full border-collapse"
  style={{ backgroundColor: "#357d95" }}>
          <thead>
            <tr className="text-white uppercase text-sm tracking-wider"
  style={{ background: "linear-gradient(to right, #357d95, #4a90e2)" }}>
              <th className="border p-3 text-left">Full Name</th>
              <th className="border p-3 text-left">Email</th>
              <th className="border p-3 text-left">Phone</th>
              <th className="border p-3 text-left">Created Date</th>
              <th className="border p-3 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {users
              .filter((u) =>
                u.fullname.toLowerCase().includes(search.toLowerCase())
              )
              .map((user, index) => (
                <tr
                  key={user.userId}
                  className={index % 2 === 0 ? "bg-white" : "bg-gray-100 hover:bg-gray-200"}
                >
                  <td className="border p-3">{user.fullname}</td>
                  <td className="border p-3">{user.email}</td>
                  <td className="border p-3">{user.phone}</td>
                  <td className="border p-3">{user.createdDate}</td>

                  <td className="border p-3 text-center flex gap-2 justify-center">
                    <Button
                      onClick={() => alert("Edit UI coming soon")}
                      className="w-auto px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded shadow"
                    >
                      Edit
                    </Button>
                    <Button
                      onClick={() => alert("Delete UI coming soon")}
                      className="w-auto px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded shadow"
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserList;
