import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useUsers from "../../hooks/user/useUsers";
import useUserForm from "../../hooks/user/useUserForm";
import Button from "../../components/ui/Button";
import InputField from "../../components/ui/input";
import Label from "../../components/ui/Label";
import api from "../../api/api";
import { ApiConstants } from "../../api/ApiConstants";

const UserList = () => {
  const navigate = useNavigate();
  const { users, setUsers, deleteUser } = useUsers();
  const { fullname, setFullname, phone, setPhone, email, setEmail, password, setPassword, role, setRole, status, setStatus, loading, setLoading, resetForm } = useUserForm();
  const [search, setSearch] = useState("");

  const filteredUsers = users.filter((user) => 
    user.fullname.toLowerCase().includes(search.toLowerCase()) || 
    user.phone.toLowerCase().includes(search.toLowerCase())
  );

  const handleRegisterUser = async () => {
    if (!fullname || !phone || !email || !password || !role || !status) {
      alert("Please fill all fields");
      return;
    }

    setLoading(true);
    try {
      const res = await api.post(`${ApiConstants.userEndpoint}/signup`, { fullname, phone, email, password, role, status });
      if (res.data.success) {
        setUsers(prev => [...prev, { ...res.data.result, userId: res.data.result._id }]);
        alert("User Created Successfully! ✅");
        resetForm();
      }
    } catch (err) {
      console.log(err);
      alert("Error Creating User");
    }
    setLoading(false);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-5 text-white bg-[#2e6f7e] p-4 rounded-lg shadow-lg">
        User Registration
      </h1>

      {/* Search */}
      <div className="mb-6 w-full flex items-end justify-between gap-4">
        <div className="flex-1">
          <Label text="Search User" />
          <InputField
            placeholder="Search by Fullname Or Phone..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Register Form */}
      <div className="flex gap-4 mb-4">
        <div className="flex flex-col gap-2 w-1/2">
          <Label text="Fullname" />
          <InputField type="text" placeholder="Enter fullname" value={fullname} onChange={(e) => setFullname(e.target.value)} />
        </div>
        <div className="flex flex-col gap-2 w-1/2">
          <Label text="Phone" />
          <InputField type="text" placeholder="Enter Phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
        </div>
      </div>

      <div className="flex gap-4 mb-4">
        <div className="flex flex-col gap-2 w-1/2">
          <Label text="Email" />
          <InputField type="email" placeholder="Enter Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="flex flex-col gap-2 w-1/2">
          <Label text="Password" />
          <InputField type="password" placeholder="Enter Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
      </div>

      <div className="flex gap-4 mb-4">
        <div className="flex flex-col gap-2 w-1/2">
          <Label text="Role" />
          <select value={role} onChange={(e) => setRole(e.target.value)} className="border rounded-md px-3 py-2">
            <option value="">Select Role</option>
            <option value="Admin">Admin</option>
            <option value="Manager">Manager</option>
            <option value="User">User</option>
          </select>
        </div>
        <div className="flex flex-col gap-2 w-1/2">
          <Label text="Status" />
          <select value={status} onChange={(e) => setStatus(e.target.value)} className="border rounded-md px-3 py-2">
            <option value="">Select Status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
            <option value="Banned">Banned</option>
          </select>
        </div>
      </div>

      <div className="mb-6">
        <Button onClick={handleRegisterUser} style={{ backgroundColor: "#2d6f7d", color: "#fff" }} className="!w-auto px-6 py-2 rounded-lg shadow">
          {loading ? "Saving..." : "Register User"}
        </Button>
      </div>

      {/* Users Table */}
      <div className="mt-10 rounded-xl overflow-hidden shadow-2xl border border-[#2e4a62] bg-[#f5f0e9]">
        <table className="min-w-full text-left text-sm">
          <thead>
            <tr className="bg-[#2e6f7e] text-white text-[15px]">
              <th className="px-4 py-3 border border-[#1f3e4d]">#</th>
              <th className="px-4 py-3 border border-[#1f3e4d]">ID</th>
              <th className="px-4 py-3 border border-[#1f3e4d]">User</th>
              <th className="px-4 py-3 border border-[#1f3e4d]">Magaca</th>
              <th className="px-4 py-3 border border-[#1f3e4d]">Role</th>
              <th className="px-4 py-3 border border-[#1f3e4d]">Status</th>
              <th className="px-4 py-3 border border-[#1f3e4d]">Tr. Diiwaanka</th>
              <th className="px-4 py-3 border border-[#1f3e4d]">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((u, index) => (
              <tr key={u.userId} className="bg-[#f7f3ee] hover:bg-[#f1ebe4] transition border-b border-[#c9c3bd]">
                <td className="px-4 py-3 border border-[#d2ccc6]">{index + 1}</td>
                <td className="px-4 py-3 border border-[#d2ccc6]">{u.userId}</td>
                <td className="px-4 py-3 border border-[#d2ccc6]">{u.userCode}</td>
                <td className="px-4 py-3 border border-[#d2ccc6]">{u.fullname}</td>
                <td className="px-4 py-3 border border-[#d2ccc6]">{u.role}</td>
                <td className="px-4 py-3 border border-[#d2ccc6]">
                  <span className={`px-3 py-1.5 text-sm font-semibold rounded-full shadow-sm ${
                    u.status === "Active" ? "bg-green-50 text-green-700 border border-green-400 shadow-green-100" :
                    "bg-red-50 text-red-700 border border-red-400 shadow-red-100"
                  }`} style={{ letterSpacing: "0.5px" }}>
                    {u.status === "Active" ? "🟢 Active" : "🔴 Inactive"}
                  </span>
                </td>
                <td className="px-4 py-3 border border-[#d2ccc6] text-gray-700"> 
                {u.createdDate && u.createdTime ? (() => {
                   const dt = new Date(`${u.createdDate}T${u.createdTime}`);
                    return dt.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" }) + " " +
                     dt.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit", second: "2-digit" });
                    })(
                     ) : "-"}
                     </td>
                <td className="px-4 py-3 border border-[#d2ccc6] flex gap-3 text-xl">
                  <span className="cursor-pointer text-orange-600 hover:text-orange-800" onClick={() => navigate("/user-update", { state: { user: u } })}>✏️</span>
                  <span className="cursor-pointer text-yellow-600 hover:text-yellow-800" onClick={() => deleteUser(u.userId)}>🔑</span>
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
