import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Button from "../components/ui/Button";
import InputField from "../components/ui/input";
import Label from "../components/ui/Label";

const Users = () => {
  const { register, login } = useAuth();
  const navigate = useNavigate();

  const [tab, setTab] = useState("list"); // "list" or "register"
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");

  // Registration form state
  const [fullname, setFullname] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Sample data for UI
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
  ];

  useEffect(() => {
    setUsers(sampleUsers);
  }, []);

  // Handle registration
  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await register(fullname, phone, email, password);

      if (res.message) {
        await login(email, password);
        navigate("/dashboard");
      } else if (res.token) {
        localStorage.setItem("token", res.token);
        localStorage.setItem("user", JSON.stringify(res.user));
        navigate("/dashboard");
      }
    } catch (err) {
      console.log(err);
      alert("User registration failed");
    }
  };

  return (
    <div className="p-6">
      {/* Tabs */}
      <div className="flex gap-4 mb-6">
        <Button
          onClick={() => setTab("list")}
          className={`w-auto px-6 ${
            tab === "list" ? "bg-blue-600" : "bg-gray-300 text-gray-800"
          }`}
        >
          User List
        </Button>
        <Button
          onClick={() => setTab("register")}
          className={`w-auto px-6 ${
            tab === "register" ? "bg-blue-600" : "bg-gray-300 text-gray-800"
          }`}
        >
          Register User
        </Button>
      </div>

      {/* User List Tab */}
      {tab === "list" && (
        <div>
          {/* Search */}
          <div className="mb-4 w-full md:w-1/3">
            <Label text="Search User" />
            <InputField
              placeholder="Search by fullname..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200 shadow-lg rounded-lg">
              <thead className="bg-gray-100">
                <tr>
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
                  .map((user) => (
                    <tr key={user.userId} className="hover:bg-gray-50">
                      <td className="border p-3">{user.fullname}</td>
                      <td className="border p-3">{user.email}</td>
                      <td className="border p-3">{user.phone}</td>
                      <td className="border p-3">{user.createdDate}</td>

                      <td className="border p-3 flex gap-2 justify-center">
                        <Button
                          onClick={() => alert("Edit UI coming soon")}
                          className="w-auto px-4 py-2 bg-green-600 hover:bg-green-700"
                        >
                          Edit
                        </Button>
                        <Button
                          onClick={() => alert("Delete UI coming soon")}
                          className="w-auto px-4 py-2 bg-red-600 hover:bg-red-700"
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
      )}

      {/* Register Tab */}
      {tab === "register" && (
        <div className="flex min-h-screen w-full justify-center items-center">
          <div className="max-w-md w-full p-8 bg-white rounded-xl shadow-lg">
            <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
              Registration Form
            </h2>

            <form onSubmit={handleRegister} className="space-y-5">
              <div>
                <Label text="Fullname" />
                <InputField
                  type="text"
                  placeholder="Enter fullname"
                  value={fullname}
                  onChange={(e) => setFullname(e.target.value)}
                />
              </div>

              <div>
                <Label text="Phone" />
                <InputField
                  type="tel"
                  placeholder="Enter phone number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>

              <div>
                <Label text="Email" />
                <InputField
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div>
                <Label text="Password" />
                <InputField
                  type="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <Button type="submit">Register User</Button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Users;
