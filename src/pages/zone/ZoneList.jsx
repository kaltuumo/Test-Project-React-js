import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useZones from "../../hooks/zone/useZones";
import useZoneForm from "../../hooks/zone/useZoneForm";
import Button from "../../components/ui/Button";
import InputField from "../../components/ui/input";
import Label from "../../components/ui/Label";
import api from "../../api/api";
import { ApiConstants } from "../../api/ApiConstants";

const ZoneList = () => {
  const navigate = useNavigate();
  const { zones, setZones, deleteZone } = useZones();
  const { zoneName, setZoneName, description, setDescription, loading, setLoading, resetForm } = useZoneForm();
  const [search, setSearch] = useState("");

   const filteredZones = zones.filter(z =>
    z.zoneName?.toLowerCase().includes(search.toLowerCase() || "") ||
    z.description?.toLowerCase().includes(search.toLowerCase() || "")
  );

  const handleAddZone = async () => {
    if (!zoneName || !description) {
      alert("Please fill all fields");
      return;
    }

    setLoading(true);
    try {
      const res = await api.post(`${ApiConstants.zoneEndpoint}/create-zone`, { zoneName, description });
      if (res.data.success) {
        setZones(prev => [...prev, { ...res.data.result, zoneId: res.data.result._id }]);
        alert("Zone Created Successfully!");
        resetForm();
      }
    } catch (err) {
      console.log(err);
      alert("Error creating zone");
    }
    setLoading(false);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-5 text-white bg-[#2e6f7e] p-4 rounded-lg shadow-lg">Zone Management</h1>

      {/* Search */}
      <div className="mb-6">
        <Label text="Search Zone" />
        <InputField placeholder="Search by Name or Description" value={search} onChange={(e) => setSearch(e.target.value)} />
      </div>

      {/* Add Zone Form */}
      <div className="flex gap-4 mb-4">
        <div className="flex flex-col gap-2 w-1/2">
          <Label text="Zone Name" />
          <InputField type="text" placeholder="Enter Zone Name" value={zoneName} onChange={(e) => setZoneName(e.target.value)} />
        </div>
        <div className="flex flex-col gap-2 w-1/2">
          <Label text="Description" />
          <InputField type="text" placeholder="Enter Description" value={description} onChange={(e) => setDescription(e.target.value)} />
        </div>
      </div>

      <div className="mb-6">
        <Button onClick={handleAddZone} style={{ backgroundColor: "#2d6f7d", color: "#fff" }} className="!w-auto px-6 py-2 rounded-lg shadow">
          {loading ? "Saving..." : "Add Zone"}
        </Button>
      </div>

      {/* Zone Table */}
      <div className="mt-10 rounded-xl overflow-hidden shadow-2xl border border-[#2e4a62] bg-[#f5f0e9]">
        <table className="min-w-full text-left text-sm">
          <thead>
            <tr className="bg-[#2e6f7e] text-white text-[15px]">
              <th className="px-4 py-3 border border-[#1f3e4d]">#</th>
              <th className="px-4 py-3 border border-[#1f3e4d]">Zone Name</th>
              <th className="px-4 py-3 border border-[#1f3e4d]">Description</th>
              <th className="px-4 py-3 border border-[#1f3e4d]">Tr.Diiwaanka</th>
              <th className="px-4 py-3 border border-[#1f3e4d]">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredZones.map((z, index) => (
              <tr key={z.zoneId} className="bg-[#f7f3ee] hover:bg-[#f1ebe4] transition border-b border-[#c9c3bd]">
                <td className="px-4 py-3 border border-[#d2ccc6]">{index + 1}</td>
                <td className="px-4 py-3 border border-[#d2ccc6]">{z.zone}</td>
                <td className="px-4 py-3 border border-[#d2ccc6]">{z.description}</td>
                <td className="px-4 py-3 border border-[#d2ccc6] text-gray-700">
                  {new Date(z.createdDate).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}{" "}
                  {new Date(z.createdDate).toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit", second: "2-digit" })}
                </td>                <td className="px-4 py-3 border border-[#d2ccc6] flex gap-3 text-xl">
                  <span className="cursor-pointer text-orange-600 hover:text-orange-800" onClick={() => navigate("/zone-update", { state: { zones: z } })}>✏️</span>
                  <span className="cursor-pointer text-yellow-600 hover:text-yellow-800" onClick={() => deleteZone(z.zoneId)}>🔑</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ZoneList;
