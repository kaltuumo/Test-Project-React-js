import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../../api/api";
import { ApiConstants } from "../../api/ApiConstants";

const ReceiptPaymentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const invoice = location.state?.invoice;

  const [method, setMethod] = useState("");
  const [payAmount, setPayAmount] = useState("");

  if (!invoice) {
    return <p>No invoice data provided.</p>;
  }

  // Calculations
  const usedKwh =
    invoice.afterRead - invoice.beforeRead > 0
      ? invoice.afterRead - invoice.beforeRead
      : 0;

  const totalAmount = usedKwh * Number(invoice.kwhUsed);
  const required = totalAmount - Number(invoice.discount);
  const remaining = Math.max(required - Number(invoice.paid), 0);

  // Handle Payment
  const handleConfirm = async () => {
    if (!method) {
      alert("Please select payment method.");
      return;
    }

    if (!payAmount || Number(payAmount) <= 0) {
      alert("Please enter valid amount.");
      return;
    }

    try {
      const res = await api.post(
        `${ApiConstants.invoiceEndpoint}/pay/${invoice._id}`,
        {
          amount: payAmount,
          method: method,
        }
      );

      if (!res.data.success) {
        alert(res.data.message || "Payment failed!");
        return;
      }

      alert("Payment Successful!");
      navigate("/invoice-list");
    } catch (error) {
      alert("Network error: " + error.message);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6 bg-[#2e6f7e] text-white p-4 rounded-lg shadow-lg">
        Receipt Payment Page
      </h1>

      {/* ONE SINGLE CONTAINER */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-bold mb-4">Invoice Information</h2>

        {/* All info inside grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          {/* CUSTOMER INFO */}
          <div>
            <label className="font-semibold">Full Name</label>
            <input
              type="text"
              value={invoice.fullname}
              disabled
              className="w-full p-3 mt-1 border rounded-lg bg-gray-100"
            />
          </div>

          <div>
            <label className="font-semibold">House No</label>
            <input
              type="text"
              value={invoice.houseNo}
              disabled
              className="w-full p-3 mt-1 border rounded-lg bg-gray-100"
            />
          </div>

          <div>
            <label className="font-semibold">Watch No</label>
            <input
              type="text"
              value={invoice.watchNo}
              disabled
              className="w-full p-3 mt-1 border rounded-lg bg-gray-100"
            />
          </div>

          <div>
            <label className="font-semibold">Bill No</label>
            <input
              type="text"
              value={invoice.billNo}
              disabled
              className="w-full p-3 mt-1 border rounded-lg bg-gray-100"
            />
          </div>

          {/* PAYMENT SUMMARY */}
          <div>
            <label className="font-semibold">Total Bill</label>
            <input
              type="text"
              value={`${totalAmount.toFixed(2)} USD`}
              disabled
              className="w-full p-3 mt-1 border rounded-lg bg-gray-100"
            />
          </div>

          <div>
            <label className="font-semibold">Discount</label>
            <input
              type="text"
              value={invoice.discount}
              disabled
              className="w-full p-3 mt-1 border rounded-lg bg-gray-100"
            />
          </div>

          <div>
            <label className="font-semibold">Previously Paid</label>
            <input
              type="text"
              value={invoice.paid}
              disabled
              className="w-full p-3 mt-1 border rounded-lg bg-gray-100"
            />
          </div>

          <div>
            <label className="font-semibold">Remaining</label>
            <input
              type="text"
              value={`${remaining.toFixed(2)} USD`}
              disabled
              className="w-full p-3 mt-1 border rounded-lg bg-red-100 text-red-700 font-bold"
            />
          </div>
        </div>

                         {/* PAYMENT FORM */}
<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">

  {/* Payment Method */}
  <div>
    <label className="font-semibold">Select Payment Method</label>
    <select
      className="w-full mt-2 p-3 border rounded-lg bg-gray-50"
      value={method}
      onChange={(e) => setMethod(e.target.value)}
    >
      <option value="">-- Choose Method --</option>
      <option value="EVC">📞 EVC Plus</option>
      <option value="E-Dahab">💳 E-Dahab</option>
      <option value="Cash">💵 Cash</option>
    </select>
  </div>

  {/* Payment Amount */}
  <div>
    <label className="font-semibold">Payment Amount</label>
    <input
      type="number"
      className="w-full mt-2 p-3 border rounded-lg bg-gray-50"
      placeholder="Enter amount..."
      value={payAmount}
      onChange={(e) => setPayAmount(e.target.value)}
    />
  </div>

</div>

{/* BUTTONS */}
<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
  
  <button
    className="px-6 py-3 bg-green-600 text-white rounded-lg w-full text-lg"
    onClick={handleConfirm}
  >
    ✅ Confirm Payment
  </button>

  <button
    className="px-6 py-3 bg-gray-700 text-white rounded-lg w-full text-lg"
    onClick={() => navigate(-1)}
  >
    🔙 Back
  </button>

</div>

      </div>
    </div>
  );
};

export default ReceiptPaymentPage;
