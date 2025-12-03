import { useState, useEffect } from "react";
import { ApiConstants } from "../../api/ApiConstants";
import api from "../../api/api";
export default function useZones() {
  const [areas, setAreas] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchAreas = async () => {
    try {
      const res = await api.get(`${ApiConstants.areaEndpoint}/all-area`);
      if (res.data.success) setAreas(res.data.data);
    } catch (err) {
      console.log("Fetch Area error:", err);
    }
  };

  // Delete Area

   const deleteArea = async (id) => {
  if (!id) return;

  const confirmDelete = window.confirm("Are you sure you want to delete this Area?");
  if (!confirmDelete) return;

  try {
    const res = await api.delete(`${ApiConstants.areaEndpoint}/delete-area/${id}`);
    if (res.data.success) {
      setAreas(prev => prev.filter(a => a._id !== id));
      alert("Area Deleted Successfully ✔️");
    }
  } catch (err) {
    console.log("Delete Error:", err);
    alert("Error deleting Area");
  }
};

  useEffect(() => {
    fetchAreas();
  }, []);

  return { areas, setAreas, fetchAreas, deleteArea, loading, setLoading };
}
