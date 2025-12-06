import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import useInvoiceForm from "../../hooks/invoice/useInvoiceForm";
import useCustomers from "../../hooks/customer/useCustomers";
import useHouses from "../../hooks/house/useHouses";
import Button from "../../components/ui/Button";
import InputField from "../../components/ui/input";
import Label from "../../components/ui/Label";
import api from "../../api/api";
import { ApiConstants } from "../../api/ApiConstants";

const InvoiceRegister = () => {
  const location = useLocation();
  const invoiceData = location.state?.invoice;

  const { customers, fetchCustomers } = useCustomers();
  const { houses, fetchHouses } = useHouses();


  const {
    fullname, setFullname,
    phone, setPhone,
    zone, setZone,
    area, setArea,
    beforeRead, setBeforeRead,
    afterRead, setAfterRead,
    discount, setDiscount,
    paid, setPaid,
    month, setMonth,
    status, setStatus,
    houseNo, setHouseNo,
    watchNo, setWatchNo,
    kwhUsed, totalAmount, required, remaining,
    loading, setLoading,
    resetForm
  } = useInvoiceForm(invoiceData);

  const [search, setSearch] = useState("");
  const [selectedHouse, setSelectedHouse] = useState(null);

  useEffect(() => {
    fetchCustomers();
    fetchHouses();
  }, []);

  useEffect(() => {
    if (invoiceData) {
      setFullname(invoiceData.fullname || "");
      setPhone(invoiceData.phone || "");
      setZone(invoiceData.zone || "");
      setArea(invoiceData.area || "");
      setBeforeRead(invoiceData.beforeRead || 0);
      setAfterRead(invoiceData.afterRead || 0);
      setDiscount(invoiceData.discount || 0);
      setPaid(invoiceData.paid || 0);
      setMonth(invoiceData.month || "");
      setStatus(invoiceData.status || "Unpaid");
      setHouseNo(invoiceData.houseNo || "");
      setWatchNo(invoiceData.watchNo || "");
    }
  }, [invoiceData]);

  // Handle House selection to auto-fill Watch No, Zone, Area
  const handleHouseSelect = (houseNo) => {
    const house = houses.find(h => h.houseNo === houseNo);
    if (house) {
      setSelectedHouse(house);
      setHouseNo(house.houseNo);
      setWatchNo(house.watchNo || "");
      setZone(house.zone || "");
      setArea(house.area || "");
    }
  };

  const handleRegisterInvoice = async () => {
    if (!fullname || !phone || !zone || !area || !beforeRead || !afterRead || !month) {
      alert("Please fill all required fields");
      return;
    }

    setLoading(true);
    try {
      const res = await api.post(`${ApiConstants.invoiceEndpoint}/create-invoice`, {
        fullname,
        phone,
        zone,
        area,
        beforeRead,
        afterRead,
        discount,
        paid,
        month,
        status,
        houseNo,
        watchNo
      });

      if (res.data.success) {
        alert("Invoice Created Successfully! ✔️");
        resetForm();
      }
    } catch (err) {
      console.log(err);
      alert("Error creating Invoice");
    }
    setLoading(false);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-5 text-white bg-[#2e6f7e] p-4 rounded-lg shadow-lg">
        Diiwaangalinta Invoice Cusub
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

      {/* Form */}
      <div className="grid grid-cols-3 gap-4 mb-4 mt-6">
         <div>
          <Label text="House No" /> House No
          <InputField value={houseNo} onChange={(e) => setHouseNo(e.target.value)} placeholder="Watch No" />
        </div>

        <div>
          <Label text="Fullname" /> Fullname
          <InputField value={fullname} onChange={(e) => setFullname(e.target.value)} placeholder="Fullname" />
        </div>
        <div>
          <Label text="Phone" /> phone
          <InputField value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Phone" />
        </div>

        

        <div>
          <Label text="Watch No" /> Watch No
          <InputField value={watchNo} onChange={(e) => setWatchNo(e.target.value)} placeholder="Watch No" />
        </div>

        <div>
          <Label text="Zone" /> Zone
          <InputField value={zone} onChange={(e) => setZone(e.target.value)} placeholder="Zone" />
        </div>
        <div>
          <Label text="Area" /> Area
          <InputField value={area} onChange={(e) => setArea(e.target.value)} placeholder="Area" />
        </div>

        <div>
          <Label text="Before Read" /> Before Read
          <InputField type="number" value={beforeRead} onChange={(e) => setBeforeRead(Number(e.target.value))} />
        </div>
        <div>
          <Label text="After Read" /> After Read
          <InputField type="number" value={afterRead} onChange={(e) => setAfterRead(Number(e.target.value))} />
        </div>

        <div>
          <Label text="Discount" /> Discount
          <InputField type="number" value={discount} onChange={(e) => setDiscount(Number(e.target.value))} />
        </div>
        <div>
          <Label text="Paid" /> Paid
          <InputField type="number" value={paid} onChange={(e) => setPaid(Number(e.target.value))} />
        </div>

        <div>
          <Label text="Month" /> Month
          <InputField value={month} onChange={(e) => setMonth(e.target.value)} placeholder="Month" />
        </div>

       <div>
  <div>
  <Label text="Status" /> Status
  <select
    value={status}
    onChange={(e) => setStatus(e.target.value)}
    className="border rounded-md px-4 py-3 w-full"
  >
    <option value="Unpaid">Unpaid</option>
    <option value="Paid">Paid</option>
    <option value="Pending">Pending</option>
  </select>
</div>


        </div>

      </div>

      {/* Calculated fields */}
      <div className="mb-6 mt-4">
        <p>KWH Used: {kwhUsed}</p>
        <p>Total Amount: {totalAmount}</p>
        <p>Required: {required}</p>
        <p>Remaining: {remaining}</p>
      </div>

      <div className="mb-6 mt-6">
        <Button
          onClick={handleRegisterInvoice}
          style={{ backgroundColor: "#2d6f7d", color: "#fff" }}
          className="!w-auto px-6 py-2 rounded-lg shadow"
        >
          {loading ? "Saving..." : "Register Invoice"}
        </Button>
      </div>
    </div>
  );
};

export default InvoiceRegister;
