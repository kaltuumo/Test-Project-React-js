import { useState, useEffect } from "react";
import api from "../../api/api";
import { ApiConstants } from "../../api/ApiConstants";

export default function useCustomers() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch all customers
  const fetchCustomers = async () => {
    try {
      const res = await api.get(`${ApiConstants.customerEndpoint}/all-customer`);
      if (res.data.success) setCustomers(res.data.data);
    } catch (err) {
      console.log("Fetch customers error:", err);
    }
  };

  // Delete customer
  const deleteCustomer = async (id) => {
    if (!id) return;

    const confirmDelete = window.confirm("Are you sure you want to delete this customer?");
    if (!confirmDelete) return;

    try {
      const res = await api.delete(`${ApiConstants.customerEndpoint}/delete-customer/${id}`);
      if (res.data.success) {
        setCustomers((prev) => prev.filter((c) => c._id !== id));
        alert("Customer deleted successfully ✔️");
      }
    } catch (err) {
      console.log("Delete error:", err);
      alert("Error deleting customer");
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  return { customers, setCustomers, loading, setLoading, fetchCustomers, deleteCustomer };
}
