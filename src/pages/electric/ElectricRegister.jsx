import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import useElectrics from "../../hooks/electric/useElectric";
import useElectricForm from "../../hooks/electric/useElectricForm";
import useCustomers from "../../hooks/customer/useCustomers";
import useHouses from "../../hooks/house/useHouses";
import Button from "../../components/ui/Button";
import InputField from "../../components/ui/input";
import Label from "../../components/ui/Label";
import api from "../../api/api";
import { ApiConstants } from "../../api/ApiConstants";

const ElectricRegister = () => {
  const location = useLocation();
  const electricData = location.state?.electric;
  
  // Hook for electrics (array)
  const { electrics, setElectrics } = useElectrics();
  const { customers, fetchCustomers } = useCustomers();
  const { houses, fetchHouses } = useHouses();


  // Electric form state
  const {
    customerNo,
    setCustomerNo,
    electricType,
    setElectricType,
    houseNo,
    setHouseNo,
    statusElectric,
    setStatusElectric,
    loading,
    setLoading,
    resetForm,
  } = useElectricForm(electricData);

  const [search, setSearch] = useState("");

  // Load zones and areas from API
  useEffect(() => {
    fetchCustomers();
    fetchHouses();
  }, []);

  // Pre-fill TextFields if electricData exists
  useEffect(() => {
    if (electricData) {
      setCustomerNo(electricData.customerNo || "");
      setElectricType(electricData.electricType || "");
      setHouseNo(electricData.houseNo || "");
      setStatusElectric(electricData.statusElectric || "");
    }
  }, [electricData, setCustomerNo, setElectricType, setHouseNo, setStatusElectric]);

  const handleRegisterElectric = async () => {
    if (!customerNo || !electricType || !houseNo || !statusElectric) {
      alert("Please fill all fields");
      return;
    }

    setLoading(true);
    try {
      const res = await api.post(
        `${ApiConstants.electricEndpoint}/create-electric`,
        { customerNo, electricType, houseNo, statusElectric }
      );

      if (res.data.success) {
        setElectrics((prev) => [...prev, { ...res.data.result }]);
        alert("Electric Created Successfully! ✔️");
        resetForm();
      }
    } catch (err) {
      console.log(err);
      alert("Error creating Electric");
    }
    setLoading(false);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-5 text-white bg-[#2e6f7e] p-4 rounded-lg shadow-lg">
        Diiwaangalinta Koronto Cusub
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
          <Label text="HouseNo" /> House No
          <InputField
            value={houseNo}
            onChange={(e) => setHouseNo(e.target.value)}
            placeholder="Enter House No"
          />
        </div>
      </div>

      <div className="flex gap-4 mb-4 mt-6">
        {/* Electric Type */}
        <div className="flex flex-col gap-2 w-1/2">
          <Label text="Electric Type" /> Electric Type
           <select value={electricType} onChange={(e) => setElectricType(e.target.value)} className="border rounded-md px-3 py-2">
            <option value="">Select Electruc Type</option>
            <option value="Saacad">Saacad</option>
            <option value="Group">Group</option>
            <option value="Freaze">Freaze</option>
          </select>
        </div>

        {/* Status */}
        <div className="flex flex-col gap-2 w-1/2">
          <Label text="Status Type" /> Status
           <select value={statusElectric} onChange={(e) => setStatusElectric(e.target.value)} className="border rounded-md px-3 py-2">
            <option value="">Select Status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
            <option value="Free Charge">Free Charge</option>
          </select>
        </div>
      </div>

      <div className="mb-6 mt-6">
        <Button
          onClick={handleRegisterElectric}
          style={{ backgroundColor: "#2d6f7d", color: "#fff" }}
          className="!w-auto px-6 py-2 rounded-lg shadow"
        >
          {loading ? "Saving..." : "Register Electric"}
        </Button>
      </div>
    </div>
  );
};

export default ElectricRegister;
