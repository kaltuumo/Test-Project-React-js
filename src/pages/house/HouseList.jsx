import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useHouses from "../../hooks/house/useHouses";
import useHouseForm from "../../hooks/house/useHouseForm";
// import Button from "../../components/ui/Button";
// import InputField from "../../components/ui/input";
// import Label from "../../components/ui/Label";
// import api from "../../api/api";
// import { ApiConstants } from "../../api/ApiConstants";

const CustomerList = () => {
  const navigate = useNavigate();
  const { houses, deleteHouse } = useHouses();
  const {
     customerNo, setCustomerNo,
    fullname, setFullname,
    phone, setPhone,
    city, setCity,
    zoneName, setZoneName,
    areaName, setAreaName,
    loading, setLoading,
    resetForm
  } = useHouseForm();

  const [search, setSearch] = useState("");
 const filteredHouses = houses.filter(house =>
    house.fullname?.toLowerCase().includes(search.toLowerCase()) ||
    house.phone?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className= "p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-5 text-white bg-[#2e6f7e] p-4 rounded-lg shadow-lg">
        House Management
      </h1>

      {/* Table */}
      <div className="mt-10 overflow-hidden rounded-xl shadow-lg border bg-white mt-8">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-[#2e6f7e] text-white">
            <tr>
              <th className="px-4 py-3 border">#</th>
              <th className="px-4 py-3 border">Macaamiil</th>
              <th className="px-4 py-3 border">House No</th>
              <th className="px-4 py-3 border">Watch No</th>
              <th className="px-4 py-3 border">Deegaan</th>
              <th className="px-4 py-3 border">Created</th>
              <th className="px-4 py-3 border">Action</th>
            </tr>
          </thead>

         <tbody>
  {filteredHouses.map((h, index) => (
    <tr key={h._id} className="hover:bg-gray-100">
      <td className="px-2 py-1 border text-xs">{index + 1}</td>
      <td className="px-2 py-1 border text-xs">
        {h.customerNo && h.fullname && h.phone
          ? `${h.customerNo} ${h.fullname} ${h.phone}`
          : "-"}
      </td>
      <td className="px-2 py-1 border text-xs">{h.houseNo}</td>
      <td className="px-2 py-1 border text-xs">{h.watchNo}</td>
      <td className="px-2 py-1 border text-xs">
        {h.zoneName && h.areaName && h.city
          ? `${h.city} - ${h.zoneName} - ${h.areaName}`
          : "-"}
      </td>
      <td className="px-2 py-1 border text-xs">
        {h.createdDate && h.createdTime
          ? `${h.createdDate} ${h.createdTime}`
          : "-"}
      </td>
      <td className="px-2 py-1 border flex gap-2 text-lg">
        <span
          className="cursor-pointer text-orange-600"
          onClick={() => navigate("/electric-register", { state: { electric: h } })}
        >
          ⚡
        </span>
        <span
          className="cursor-pointer text-orange-600"
          onClick={() => navigate("/customer-update", { state: { electric: h } })}
        >
          ✏️
        </span>
        <span
          className="cursor-pointer text-red-600"
                    onClick={() => navigate("/invoice-register", { state: { invoice: h } })}
        >
          💵
        </span>
      </td>
    </tr>
  ))}
</tbody>

        </table>
      </div>
    </div>
  );
  
};

export default CustomerList;
