import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import useHouses from "../../hooks/house/useHouses";
import useHouseForm from "../../hooks/house/useHouseForm";
import useZones from "../../hooks/zone/useZones";
import useArea from "../../hooks/area/useArea";
import Button from "../../components/ui/Button";
import InputField from "../../components/ui/input";
import Label from "../../components/ui/Label";
import api from "../../api/api";
import { ApiConstants } from "../../api/ApiConstants";

const HouseRegister = () => {
  const location = useLocation(); 
  const house = location.state?.house;

  const { setHouses } = useHouses();
  const { zones, fetchZones } = useZones();
  const { areas, fetchAreas } = useArea();
  
  const {
    customerNo, setCustomerNo,
    fullname, setFullname,
    phone, setPhone,
    zoneName, setZoneName,
    areaName, setAreaName,
    city, setCity,
    loading, setLoading,
    resetForm
  } = useHouseForm(house);

  const [search, setSearch] = useState("");

  // Load zones and areas from API
  useEffect(() => {
    fetchZones();
    fetchAreas();
  }, []);

  // Pre-fill TextFields if house exists
  useEffect(() => {
    if (house) {
      setCustomerNo(house.customerNo || "");
      setFullname(house.fullname || "");
      setPhone(house.phone || "");
      setZoneName(house.zoneName || "");
      setAreaName(house.areaName || "");
      setCity(house.city || "");
    }
  }, [house, setCustomerNo, setFullname, setPhone, setZoneName, setAreaName, setCity]);

  const handleRegisterHouse = async () => {
    if (!fullname || !phone || !zoneName || !areaName || !city) {
      alert("Please fill all fields");
      return;
    }

    setLoading(true);
    try {
      const res = await api.post(
        `${ApiConstants.houseEndpoint}/create-house`,
        { fullname, phone, zoneName, areaName, city }
      );

      if (res.data.success) {
        setHouses(prev => [...prev, { ...res.data.result }]);
        alert("House Created Successfully! ✔️");
        resetForm();
      }
    } catch (err) {
      console.log(err);
      alert("Error creating House");
    }
    setLoading(false);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-5 text-white bg-[#2e6f7e] p-4 rounded-lg shadow-lg">
        House Registration
      </h1>

      {/* Search */}
      <div className="mb-6 w-full">
        <Label text="Search Customer" />
        <InputField
          placeholder="Search by Name or Phone..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Register Form */}
      <div className="flex gap-4 mb-4 mt-6">
        <div className="flex-1">
          <Label text="CustomerNo" /> ID
          <InputField
            value={customerNo}
            onChange={(e) => setCustomerNo(e.target.value)}
            placeholder="Enter Customer No"
          />
        </div>

        <div className="flex-1">
          <Label text="Fullname" /> Fullname
          <InputField
            value={fullname}
            onChange={(e) => setFullname(e.target.value)}
            placeholder="Enter FullName"
          />
        </div>
      </div>

      <div className="flex gap-4 mb-4 mt-6">
        {/* Zone */}
        <div className="flex flex-col gap-2 w-1/2">
          <Label text="Zone" /> Zone
          <select
            value={zoneName}
            onChange={(e) => setZoneName(e.target.value)}
            className="border rounded-md px-3 py-3"
          >
            <option value="">Select Zone</option>
            {zones.map((zone) => (
              <option key={zone._id} value={zone.zoneName}>
                {zone.zoneName}
              </option>
            ))}
          </select>
        </div>

        {/* Area */}
        <div className="flex flex-col gap-2 w-1/2">
          <Label text="Area" /> Area
          <select
            value={areaName}
            onChange={(e) => setAreaName(e.target.value)}
            className="border rounded-md px-3 py-3"
          >
            <option value="">Select Area</option>
            {areas.map((area) => (
              <option key={area._id} value={area.areaName}>
                {area.areaName}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* City */}
      <div className="mb-6">
        <Label text="City" /> City
        <InputField
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter City"
        />
      </div>

      <div className="mb-6 mt-6">
        <Button
          onClick={handleRegisterHouse}
          style={{ backgroundColor: "#2d6f7d", color: "#fff" }}
          className="!w-auto px-6 py-2 rounded-lg shadow"
        >
          {loading ? "Saving..." : "Register House"}
        </Button>
      </div>
    </div>
  );
};

export default HouseRegister;
