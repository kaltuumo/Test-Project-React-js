import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useArea from "../../hooks/area/useArea";
import useAreaForm from "../../hooks/area/useAreaForm";
import useZones from "../../hooks/zone/useZones";
import Button from "../../components/ui/Button";
import InputField from "../../components/ui/input";
import Label from "../../components/ui/Label";
import api from "../../api/api";
import { ApiConstants } from "../../api/ApiConstants";

const AreaList = () => {
  const navigate = useNavigate();
  const { areas, setAreas, deleteArea } = useArea();
  const { areaName, setAreaName, zoneName, setZoneName, description, setDescription, loading, setLoading, resetForm } = useAreaForm();
  const { zones, fetchZones } = useZones();
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchZones(); // load zones from API
  }, []);

  const filteredAreas = areas.filter(a =>
    a.areaName?.toLowerCase().includes(search.toLowerCase()) ||
    a.zoneName?.toLowerCase().includes(search.toLowerCase())
  );

  const handleAddArea = async () => {
    if (!areaName || !zoneName || !description) {
      alert("Please fill all fields");
      return;
    }

    setLoading(true);
    try {
      const res = await api.post(`${ApiConstants.zoneEndpoint}/create-area`, { areaName, zoneName, description });
      if (res.data.success) {
        setAreas(prev => [...prev, { ...res.data.result, areaId: res.data.result._id }]);
        alert("Area Created Successfully!");
        resetForm();
      }
    } catch (err) {
      console.log(err);
      alert("Error creating Area");
    }
    setLoading(false);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-5 text-white bg-[#2e6f7e] p-4 rounded-lg shadow-lg">Area Management</h1>

      {/* Search */}
      <div className="mb-6">
        <Label text="Search Area" />
        <InputField placeholder="Search by Name or Zone" value={search} onChange={(e) => setSearch(e.target.value)} />
      </div>

      {/* Area Form */}
      <div className="flex gap-4 mb-4">
        <div className="flex flex-col gap-2 w-1/2">
          <Label text="Area Name" />
          <InputField type="text" placeholder="Enter area" value={areaName} onChange={(e) => setAreaName(e.target.value)} />
        </div>

        {/* Zone Select */}
        <div className="flex flex-col gap-2 w-1/2">
          <Label text="Zone" />
          <select value={zoneName} onChange={(e) => setZoneName(e.target.value)} className="border rounded-md px-3 py-2">
            <option value="">Select Zone</option>
            {zones.map((zone) => (
              <option key={zone._id} value={zone.zoneName}>
                {zone.zoneName}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex flex-col gap-2 mb-6">
        <Label text="Description" />
        <InputField type="text" placeholder="Enter description" value={description} onChange={(e) => setDescription(e.target.value)} />
      </div>

      <div className="mb-6">
        <Button onClick={handleAddArea} style={{ backgroundColor: "#2d6f7d", color: "#fff" }} className="!w-auto px-6 py-2 rounded-lg shadow">
          {loading ? "Saving..." : "Add Area"}
        </Button>
      </div>

      {/* Area Table */}
      <div className="mt-10 rounded-xl overflow-hidden shadow-2xl border border-[#2e4a62] bg-[#f5f0e9]">
        <table className="min-w-full text-left text-sm">
          <thead>
            <tr className="bg-[#2e6f7e] text-white text-[15px]">
              <th className="px-4 py-3 border border-[#1f3e4d]">#</th>
              <th className="px-4 py-3 border border-[#1f3e4d]">Area Name</th>
              <th className="px-4 py-3 border border-[#1f3e4d]">Zone Name</th>
              <th className="px-4 py-3 border border-[#1f3e4d]">Description</th>
              <th className="px-4 py-3 border border-[#1f3e4d]">Tr. Diiwaanka</th>
              <th className="px-4 py-3 border border-[#1f3e4d]">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredAreas.map((a, index) => (
              <tr key={a.areaId} className="bg-[#f7f3ee] hover:bg-[#f1ebe4] transition border-b border-[#c9c3bd]">
                <td className="px-4 py-3 border border-[#d2ccc6]">{index + 1}</td>
                <td className="px-4 py-3 border border-[#d2ccc6]">{a.areaName}</td>
                <td className="px-4 py-3 border border-[#d2ccc6]">{a.zoneName}</td>
                <td className="px-4 py-3 border border-[#d2ccc6]">{a.description}</td>
                 <td className="px-4 py-3 border border-[#d2ccc6] text-gray-700"> 
                {a.createdDate && a.createdTime ? (() => {
                   const dt = new Date(`${a.createdDate}T${a.createdTime}`);
                    return dt.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" }) + " " +
                     dt.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit", second: "2-digit" });
                    })(

                     ) : "-"}
                     </td>
                <td className="px-4 py-3 border border-[#d2ccc6] flex gap-3 text-xl">
                  <span className="cursor-pointer text-orange-600 hover:text-orange-800" onClick={() => navigate("/area-update", { state: { area: a } })}>✏️</span>
                  <span className="cursor-pointer text-yellow-600 hover:text-yellow-800" onClick={() => deleteArea(a._id)}>🔑</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AreaList;
