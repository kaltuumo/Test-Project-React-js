import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useUserForm from "../../hooks/user/useUserForm";
import Button from "../../components/ui/Button";
import InputField from "../../components/ui/input";
import Label from "../../components/ui/Label";
import api from "../../api/api";
import { ApiConstants } from "../../api/ApiConstants";

const UpdateUser = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const user = location.state?.user;

  const { fullname, setFullname, phone, setPhone, email, setEmail, role, setRole, status, setStatus, loading, setLoading } = useUserForm(user);

  const handleUpdateUser = async () => {
    setLoading(true);
    try {
      const res = await api.put(`${ApiConstants.userEndpoint}/update-user/${user.userId || user._id}`, { fullname, phone, email, role, status });
      if (res.data.success) {
        alert("User Updated Successfully!");
        navigate("/user-list");
      }
    } catch (err) {
      console.log(err);
      alert("Error updating user");
    }
    setLoading(false);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-5 text-white bg-[#2e6f7e] p-4 rounded-lg shadow-lg">Update User</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col gap-2">
          <Label text="Fullname" /> Fullname
          <InputField type="text" placeholder="Enter fullname" value={fullname} onChange={(e) => setFullname(e.target.value)} />
        </div>
        <div className="flex flex-col gap-2">
          <Label text="Phone" /> Phone
          <InputField type="text" placeholder="Enter Phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <div className="flex flex-col gap-2">
          <Label text="Email" /> Email
          <InputField type="text" placeholder="Enter Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="flex flex-col gap-2">
          <Label text="Status" /> Status
          <InputField type="text" placeholder="Enter Status" value={status} onChange={(e) => setStatus(e.target.value)} />
        </div>
        <div className="flex flex-col gap-2">
          <Label text="Role" /> Role
          <InputField type="text" placeholder="Enter Role" value={role} onChange={(e) => setRole(e.target.value)} />
        </div>
      </div>

      <Button onClick={handleUpdateUser} style={{ backgroundColor: "#2d6f7d", color: "#fff" }} className="mt-8 px-6 py-2 rounded-lg shadow">
        {loading ? "Updating..." : "Update User"}
      </Button>
    </div>
  );
};

export default UpdateUser;
