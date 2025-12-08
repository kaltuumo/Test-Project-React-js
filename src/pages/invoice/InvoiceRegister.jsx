import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import useInvoiceForm from "../../hooks/invoice/useInvoiceForm";
import Button from "../../components/ui/Button";
import InputField from "../../components/ui/input";
import Label from "../../components/ui/Label";
import api from "../../api/api";
import { ApiConstants } from "../../api/ApiConstants";

const InvoiceRegister = () => {
  const location = useLocation();
  const invoiceData = location.state?.invoice;

  const {
    fullname, setFullname,
    phone, setPhone,
    zone, setZone,
    area, setArea,
    beforeRead, setBeforeRead,
    afterRead, setAfterRead,
    discount, setDiscount,
    kwhUsed, setKwhUsed,
    paid, setPaid,
    month, setMonth,
    status, setStatus,
    houseNo, setHouseNo,
    watchNo, setWatchNo,
    loading, setLoading,
    resetForm
  } = useInvoiceForm(invoiceData);

  const [search, setSearch] = useState("");

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
      setKwhUsed(invoiceData.afterRead - invoiceData.beforeRead || 0);
    }
  }, [invoiceData]);


  // ======================================
  // 🔥 AUTO CALCULATIONS — FIXED VERSION
  // ======================================

  const calculatedKwh = afterRead > beforeRead ? afterRead - beforeRead : 0;

  const calculatedTotal = calculatedKwh * kwhUsed;

  const calculatedRequired = calculatedTotal - discount;

  const calculatedRemaining = Math.max(calculatedRequired - paid, 0);


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
        kwhUsed,
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
        Sales Invoice 
      </h1>

      <div className="mb-6 w-full">
        <Label text="Search Customer" />
        <InputField
          placeholder="Search by Name or Phone..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-3 gap-4 mb-4 mt-6">
        <div>
          <Label text="House No" /> House No
          <InputField value={houseNo} onChange={(e) => setHouseNo(e.target.value)} />
        </div>

        <div>
          <Label text="Fullname" /> Fullname
          <InputField value={fullname} onChange={(e) => setFullname(e.target.value)} />
        </div>

        <div>
          <Label text="Phone" /> Phone
          <InputField value={phone} onChange={(e) => setPhone(e.target.value)} />
        </div>

        <div>
          <Label text="Watch No" /> Watch No
          <InputField value={watchNo} onChange={(e) => setWatchNo(e.target.value)} />
        </div>

        <div>
          <Label text="Zone" /> Zone
          <InputField value={zone} onChange={(e) => setZone(e.target.value)} />
        </div>

        <div>
          <Label text="Area" /> Area
          <InputField value={area} onChange={(e) => setArea(e.target.value)} />
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
          <Label text="KWH Price" /> KwhUsed
          <InputField type="number" value={kwhUsed} onChange={(e) => setKwhUsed(Number(e.target.value))} />
        </div>

        <div>
          <Label text="Paid" />  Paid
          <InputField type="number" value={paid} onChange={(e) => setPaid(Number(e.target.value))} />
        </div>

        <div>
          <Label text="Month" /> Month
          <InputField value={month} onChange={(e) => setMonth(e.target.value)} />
        </div>

        <div>
          <Label text="Status" /> Status
          <select value={status} onChange={(e) => setStatus(e.target.value)} className="border rounded-md px-4 py-3 w-full">
            <option value="Unpaid">Unpaid</option>
            <option value="Paid">Paid</option>
            <option value="Pending">Pending</option>
          </select>
        </div>
      </div>

      {/* ==========================
            SUMMARY SECTION FIXED
      =========================== */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 mt-6">

        <div className="bg-white p-4 rounded-lg shadow text-center">
          <p className="text-gray-500 text-sm">KWH Used</p>
          <p className="text-xl font-bold">{calculatedKwh}</p>
        </div>

        <div className="bg-white p-4 rounded-lg shadow text-center">
          <p className="text-gray-500 text-sm">Total Amount</p>
          <p className="text-xl font-bold">{calculatedTotal.toFixed(2)}</p>
        </div>

        <div className="bg-white p-4 rounded-lg shadow text-center">
          <p className="text-gray-500 text-sm">Required</p>
          <p className="text-xl font-bold">{calculatedRequired.toFixed(2)}</p>
        </div>

        <div className="bg-white p-4 rounded-lg shadow text-center">
          <p className="text-gray-500 text-sm">Remaining</p>
          <p className="text-xl font-bold">{calculatedRemaining.toFixed(2)}</p>
        </div>

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
