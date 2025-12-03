import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useAreaForm from "../../hooks/area/useAreaForm";
import Button from "../../components/ui/Button";
import InputField from "../../components/ui/input";
import Label from "../../components/ui/Label";
import api from "../../api/api";
import { ApiConstants } from "../../api/ApiConstants";


const UpdateArea = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const area = location.state?.area;

  const {areaName,setAreaName, zoneName, setZoneName, description, setDescription, loading, setLoading } = useAreaForm(area);

  const handleUpdateArea = async () => {
    setLoading(true);
    try {
      const res = await api.put(`${ApiConstants.areaEndpoint}/update-zone/${area.areaId || area._id}`, {areaName, zoneName, description });
      if (res.data.success) {
        alert("Area Updated Successfully!");
        navigate("/area-list");
      }
    } catch (err) {
      console.log(err);
      alert("Error updating Area");
    }
    setLoading(false);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-5 text-white bg-[#2e6f7e] p-4 rounded-lg shadow-lg">Update Zone</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col gap-2">
          <Label text="Area Name" /> Area Name
          <InputField type="text" value={areaName} onChange={(e) => setAreaName(e.target.value)} />
        </div>
        <div className="flex flex-col gap-2">
          <Label text="Zone Name" /> Zone Name
          <InputField type="text" value={zoneName} onChange={(e) => setZoneName(e.target.value)} />
        </div>
        <div className="flex flex-col gap-2">
          <Label text="Description" /> Description
          <InputField type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
        </div>
      </div>

      <Button onClick={handleUpdateArea} style={{ backgroundColor: "#2d6f7d", color: "#fff" }} className="mt-8 px-6 py-2 rounded-lg shadow">
        {loading ? "Updating..." : "Update Area"}
      </Button>
    </div>
  );
};

export default UpdateArea;
