import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useCustomerForm from "../../hooks/customer/useCustomerForm";
import Button from "../../components/ui/Button";
import InputField from "../../components/ui/input";
import Label from "../../components/ui/Label";
import api from "../../api/api";
import { ApiConstants } from "../../api/ApiConstants";

const UpdateCustomer = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const customer = location.state?.customer;

  const {
    fullname, setFullname,
    phone, setPhone,
    gender, setGender,
    statusPerson, setStatusPerson,
    damiin, setDamiin,
    damiinPhone, setDamiinPhone,
    loading, setLoading
  } = useCustomerForm(customer);

  const handleUpdateCustomer = async () => {
    setLoading(true);
    try {
      const res = await api.put(
        `${ApiConstants.customerEndpoint}/update-customer/${customer._id}`,
        { fullname, phone, gender, statusPerson, damiin , damiinPhone}
      );

      if (res.data.success) {
        alert("Customer Updated Successfully!");
        navigate("/customer-list");
      }
    } catch (err) {
      console.log(err);
      alert("Error updating customer");
    }
    setLoading(false);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-5 text-white bg-[#2e6f7e] p-4 rounded-lg shadow-lg">
        Update Customer
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        <div>
          <Label text="Fullname" /> Fulllname
          <InputField value={fullname} onChange={(e) => setFullname(e.target.value)} />
        </div>

        <div>
          <Label text="Phone" />Phone
          <InputField value={phone} onChange={(e) => setPhone(e.target.value)} />
        </div>

      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">

        <div>
          <Label text="Gender" /> Gender
          <InputField value={gender} onChange={(e) => setGender(e.target.value)} />
        </div>

        <div>
          <Label text="Status Person" /> Status Person
          <InputField value={statusPerson} onChange={(e) => setStatusPerson(e.target.value)} />
        </div>

        

      </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">

        <div>
          <Label text="Damiin" /> Damiin-ka
          <InputField value={damiin} onChange={(e) => setDamiin(e.target.value)} />
        </div>

        <div>
          <Label text="damiinPhone" /> Damiin Phone
          <InputField value={damiinPhone} onChange={(e) => setDamiinPhone(e.target.value)} />
        </div>

      

      </div>


      <Button
        onClick={handleUpdateCustomer}
        style={{ backgroundColor: "#2d6f7d", color: "#fff" }}
        className="mt-8 px-6 py-2 rounded-lg shadow"
      >
        {loading ? "Updating..." : "Update Customer"}
      </Button>

    </div>
  );
};

export default UpdateCustomer;
