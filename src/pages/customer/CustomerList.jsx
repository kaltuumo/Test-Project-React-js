import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useCustomers from "../../hooks/customer/useCustomers";
import useCustomerForm from "../../hooks/customer/useCustomerForm";
import Button from "../../components/ui/Button";
import InputField from "../../components/ui/input";
import Label from "../../components/ui/Label";
import api from "../../api/api";
import { ApiConstants } from "../../api/ApiConstants";

const CustomerList = () => {
  const navigate = useNavigate();
  const { customers, setCustomers, deleteCustomer } = useCustomers();
  const {
    fullname, setFullname,
    phone, setPhone,
    gender, setGender,
    statusPerson, setStatusPerson,
    damiin, setDamiin,
    damiinPhone, setDamiinPhone,
    loading, setLoading,
    resetForm
  } = useCustomerForm();

  const [search, setSearch] = useState("");

  const filteredCustomers = customers.filter(customer =>
    customer.fullname?.toLowerCase().includes(search.toLowerCase()) ||
    customer.phone?.toLowerCase().includes(search.toLowerCase())
  );

  const handleRegisterCustomer = async () => {
    if (!fullname || !phone || !gender || !statusPerson || !damiin || !damiinPhone) {
      alert("Please fill all fields");
      return;
    }

    setLoading(true);
    try {
      const res = await api.post(
        `${ApiConstants.customerEndpoint}/create-customer`,
        { fullname, phone, gender, statusPerson, damiin , damiinPhone }
      );

      if (res.data.success) {
        setCustomers(prev => [...prev, { ...res.data.result }]);
        alert("Customer Created Successfully! ✔️");
        resetForm();
      }
    } catch (err) {
      console.log(err);
      alert("Error creating customer");
    }
    setLoading(false);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">

      <h1 className="text-2xl font-bold mb-5 text-white bg-[#2e6f7e] p-4 rounded-lg shadow-lg">
        Customer Registration
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
<div className="flex gap-4 mb-4 mt-10">
  <div className="flex-1">
    <Label text="Fullname" />
    <InputField
      value={fullname}
      onChange={(e) => setFullname(e.target.value)}
      placeholder="Enter Full Name"
    />
  </div>

  <div className="flex-1">
    <Label text="Phone" />
    <InputField
      value={phone}
      onChange={(e) => setPhone(e.target.value)}
      placeholder="Enter Phone Number"
    />
  </div>
</div>

 <div className="flex gap-4 mb-4">
  <div className="flex-1">
    <Label text="Gender" />
    <InputField
      value={gender}
      onChange={(e) => setGender(e.target.value)}
      placeholder="Male / Female"
    />
   </div>

   <div className="flex-1">
    <Label text="Status" />
    <InputField
      value={statusPerson}
      onChange={(e) => setStatusPerson(e.target.value)}
      placeholder="Married / Single"
    />
   </div>

   
  </div>

 <div className="flex gap-4 mb-4">
  <div className="flex-1">
    <Label text="Damiin" />
    <InputField
      value={damiin}
      onChange={(e) => setDamiin(e.target.value)}
      placeholder="Enter Damiin"
    />
   </div>

   <div className="flex-1">
    <Label text="damiinPhone" />
    <InputField
      value={damiinPhone}
      onChange={(e) => setDamiinPhone(e.target.value)}
      placeholder="Enter Damiin Phone"
    />
   </div>

   
  </div>


     <div className="mb-6">
        <Button onClick={handleRegisterCustomer} style={{ backgroundColor: "#2d6f7d", color: "#fff" }} className="!w-auto px-6 py-2 rounded-lg shadow">
          {loading ? "Saving..." : "Register Customer"}
        </Button>
      </div>
      {/* Table */}
      <div className="mt-10 overflow-hidden rounded-xl shadow-lg border bg-white mt-8">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-[#2e6f7e] text-white">
            <tr>
              <th className="px-4 py-3 border">#</th>
              <th className="px-4 py-3 border">ID</th>
              <th className="px-4 py-3 border">Fullname</th>
              <th className="px-4 py-3 border">Phone</th>
              <th className="px-4 py-3 border">Gender</th>
              <th className="px-4 py-3 border">Status</th>
              <th className="px-4 py-3 border">Damiin</th>
              <th className="px-4 py-3 border">Created</th>
              <th className="px-4 py-3 border">Action</th>
            </tr>
          </thead>

          <tbody>
            {filteredCustomers.map((c, index) => (
              <tr key={c._id} className="hover:bg-gray-100">
                <td className="px-4 py-3 border">{index + 1}</td>
                <td className="px-4 py-3 border">{c.customerNo}</td>
                <td className="px-4 py-3 border">{c.fullname}</td>
                <td className="px-4 py-3 border">{c.phone}</td>
                <td className="px-4 py-3 border">{c.gender}</td>
                <td className="px-4 py-3 border">{c.statusPerson}</td>
                <td className="px-4 py-3 border">{c.damiin}</td>

                <td className="px-4 py-3 border">
                  {new Date(c.createdDate).toLocaleDateString()}
                </td>

                <td className="px-4 py-3 border flex gap-3 text-xl">
                  <span
                    className="cursor-pointer text-orange-600"
                    onClick={() => navigate("/customer-update", { state: { customer: c } })}
                  >
                    ✏️
                  </span>

                  <span
                    className="cursor-pointer text-red-600"
                    onClick={() => deleteCustomer(c._id)}
                  >
                    🔑
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
