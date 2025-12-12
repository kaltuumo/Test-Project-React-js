import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useInvoice from "../../hooks/invoice/useInvoice";
import useInvoiceForm from "../../hooks/invoice/useInvoiceForm";
import Button from "../../components/ui/Button";
import InputField from "../../components/ui/input";
import Label from "../../components/ui/Label";

const InvoiceRegister = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { createInvoice } = useInvoice();

  const form = useInvoiceForm(location.state?.invoice);

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const payload = {
        fullname: form.fullname,
        phone: form.phone,
        zone: form.zone,
        area: form.area,
        beforeRead: form.beforeRead,
        afterRead: form.afterRead,
        kwhUsed: form.kwhUsed,
        discount: form.discount,
        month: form.month,
        status: form.status,
        houseNo: form.houseNo,
        watchNo: form.watchNo,
        paid: form.paid
      };
      const res = await createInvoice(payload);
      if (res.success) {
        alert("Invoice Created Successfully!");
        navigate("/invoice-list");
      }
    } catch (err) {
      console.error(err);
      alert("Failed to create invoice");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
 <h1 className="text-2xl font-bold mb-5 text-white bg-[#2e6f7e] p-4 rounded-lg shadow-lg">
        Invoice Registration
      </h1>        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Row 1: Fullname, Phone, Zone */}
          <div className="grid grid-cols-3 gap-4">
            <div><Label>Full Name</Label> 
            <InputField value={form.fullname} onChange={e => form.setFullname(e.target.value)} /></div>
            <div><Label>Phone</Label><InputField value={form.phone} onChange={e => form.setPhone(e.target.value)} /></div>
            <div><Label>Zone</Label><InputField value={form.zone} onChange={e => form.setZone(e.target.value)} /></div>
          </div>

          {/* Row 2: Area, HouseNo, WatchNo */}
          <div className="grid grid-cols-3 gap-4">
            <div><Label>Area</Label><InputField value={form.area} onChange={e => form.setArea(e.target.value)} /></div>
            <div><Label>House No</Label><InputField value={form.houseNo} onChange={e => form.setHouseNo(e.target.value)} /></div>
            <div><Label>Watch No</Label><InputField value={form.watchNo} onChange={e => form.setWatchNo(e.target.value)} /></div>
          </div>

          {/* Row 3: BeforeRead, AfterRead, KWH */}
          <div className="grid grid-cols-3 gap-4">
            <div><Label>Before Read</Label><InputField type="number" value={form.beforeRead} onChange={e => form.setBeforeRead(Number(e.target.value))} /></div>
            <div><Label>After Read</Label><InputField type="number" value={form.afterRead} onChange={e => form.setAfterRead(Number(e.target.value))} /></div>
            <div><Label>KWH Used</Label><InputField type="number" value={form.kwhUsed} onChange={e => form.setKwhUsed(Number(e.target.value))} /></div>
          </div>

          {/* Row 4: Discount, Paid, Month */}
          <div className="grid grid-cols-3 gap-4">
            <div><Label>Discount</Label><InputField type="number" value={form.discount} onChange={e => form.setDiscount(Number(e.target.value))} /></div>
            <div><Label>Paid</Label><InputField type="number" value={form.paid} onChange={e => form.setPaid(Number(e.target.value))} /></div>
            <div><Label>Month</Label><InputField value={form.month} onChange={e => form.setMonth(e.target.value)} /></div>
          </div>
            
<div className="grid grid-cols-1 gap-4">
  <div>
    <Label>Status</Label>
    <select
      value={form.status}
      onChange={e => form.setStatus(e.target.value)}
      className="border px-4 py-2 rounded w-full"
    >
      <option value="">Select Status</option>
      <option value="Paid">Paid</option>
      <option value="Unpaid">Unpaid</option>
      <option value="Pending">Pending</option>
    </select>
  
</div>

          </div>

          {/* Totals */}
          <div className="bg-white p-4 rounded shadow-inner text-gray-700">
            <p><strong>Total:</strong> {form.totalAmount}</p>
            <p><strong>Required:</strong> {form.required}</p>
            <p><strong>Remaining:</strong> {form.remaining}</p>
          </div>

          <Button type="submit" disabled={loading} className="w-full">
            {loading ? "Creating..." : "Create Invoice"}
          </Button>
        </form>
      </div>
    
  );
};

export default InvoiceRegister;
