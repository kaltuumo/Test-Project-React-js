import { useState, useEffect } from "react";
import { ApiConstants } from "../../api/ApiConstants";
import api from "../../api/api";
export default function useZones() {
  const [zones, setZones] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchZones = async () => {
    try {
      const res = await api.get(`${ApiConstants.zoneEndpoint}/all-zone`);
      if (res.data.success) setZones(res.data.data);
    } catch (err) {
      console.log("Fetch zones error:", err);
    }
  };

  // Delete Zone
 
  // Delete user
  const deleteZone = async (id) => {
  if (!id) return;

  const confirmDelete = window.confirm("Are you sure you want to delete this zone?");
  if (!confirmDelete) return;

  try {
    const res = await api.delete(`${ApiConstants.zoneEndpoint}/delete-zone/${id}`);
    if (res.data.success) {
      setZones(prev => prev.filter(z => z._id !== id));
      alert("Zone Deleted Successfully ✔️");
    }
  } catch (err) {
    console.log("Delete Error:", err);
    alert("Error deleting Zone");
  }
};

  useEffect(() => {
    fetchZones();
  }, []);

  return { zones, setZones, fetchZones, deleteZone, loading, setLoading };
}
