import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useZoneForm from "../../hooks/zone/useZoneForm";
import Button from "../../components/ui/Button";
import InputField from "../../components/ui/input";
import Label from "../../components/ui/Label";
import api from "../../api/api";
import { ApiConstants } from "../../api/ApiConstants";


const UpdateZone = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const zone = location.state?.zone;

  const { zoneName, setZoneName, description, setDescription, loading, setLoading } = useZoneForm(zone);

  const handleUpdateZone = async () => {
    setLoading(true);
    try {
      const res = await api.put(`${ApiConstants.zoneEndpoint}/update-zone/${zone.zoneId || zone._id}`, { zoneName, description });
      if (res.data.success) {
        alert("Zone Updated Successfully!");
        navigate("/zone-list");
      }
    } catch (err) {
      console.log(err);
      alert("Error updating zone");
    }
    setLoading(false);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-5 text-white bg-[#2e6f7e] p-4 rounded-lg shadow-lg">Update Zone</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col gap-2">
          <Label text="Zone Name" />
          <InputField type="text" value={zoneName} onChange={(e) => setZoneName(e.target.value)} />
        </div>
        <div className="flex flex-col gap-2">
          <Label text="Description" />
          <InputField type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
        </div>
      </div>

      <Button onClick={handleUpdateZone} style={{ backgroundColor: "#2d6f7d", color: "#fff" }} className="mt-8 px-6 py-2 rounded-lg shadow">
        {loading ? "Updating..." : "Update Zone"}
      </Button>
    </div>
  );
};

export default UpdateZone;
