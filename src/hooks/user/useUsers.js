import { useState, useEffect } from "react";
import api from "../../api/api";
import { ApiConstants } from "../../api/ApiConstants";

export default function useUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch users
  const fetchUsers = async () => {
    try {
      const res = await api.get(`${ApiConstants.userEndpoint}/all-user`);
      if (res.data.success) setUsers(res.data.data);
    } catch (err) {
      console.log("Fetch users error:", err);
    }
  };

  // Delete user
  const deleteUser = async (id) => {
    if (!id) return;
    const confirmDelete = window.confirm("Are you sure you want to delete this user?");
    if (!confirmDelete) return;

    try {
      const res = await api.delete(`${ApiConstants.userEndpoint}/delete-user/${id}`);
      if (res.data.success) {
        setUsers((prev) => prev.filter((u) => u.userId !== id));
        alert("User Deleted Successfully ✔️");
      }
    } catch (err) {
      console.log("Delete Error:", err);
      alert("Error deleting user");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return { users, setUsers, loading, setLoading, fetchUsers, deleteUser };
}
