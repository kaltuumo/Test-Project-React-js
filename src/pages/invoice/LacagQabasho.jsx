import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useInvoice from "../../hooks/invoice/useInvoice";

const LacagQabasho = () => {
  const navigate = useNavigate();
  const { invoices, loading, fetchInvoices } = useInvoice();

  const [paidInvoices, setPaidInvoices] = useState([]);

  useEffect(() => {
    fetchInvoices();
  }, []);

  useEffect(() => {
    const paid = invoices.filter((i) => i.status === "Paid");
    setPaidInvoices(paid);
  }, [invoices]);

  if (loading) return <p>Loading invoices...</p>;

  // Function to format number as USD
  const formatCurrency = (amount) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-5 text-white bg-[#2e6f7e] p-4 rounded-lg shadow-lg">
        Lacag Qabasho
      </h1>

      <div className="mt-6 overflow-hidden shadow-2xl border border-[#2e4a62] bg-[#f5f0e9]">
        <table className="min-w-full text-left text-sm border-collapse">
          <thead>
            <tr className="bg-[#2e6f7e] text-white text-[15px]">
              <th className="px-4 py-3 border border-[#1f3e4d]">#</th>
              <th className="px-4 py-3 border border-[#1f3e4d]">Bill No</th>
              <th className="px-4 py-3 border border-[#1f3e4d]">Macaamiil</th>
              <th className="px-4 py-3 border border-[#1f3e4d]">Total</th>
              <th className="px-4 py-3 border border-[#1f3e4d]">T.Diiwaanka</th>
              <th className="px-4 py-3 border border-[#1f3e4d]">Action</th>
            </tr>
          </thead>

          <tbody>
            {paidInvoices.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-3 text-center">
                  Ma jiraan invoices la bixiyay.
                </td>
              </tr>
            )}

            {paidInvoices.map((i, index) => {
              const usedKwh =
                i.afterRead - i.beforeRead > 0
                  ? i.afterRead - i.beforeRead
                  : 0;
              const totalAmount = usedKwh * Number(i.kwhUsed);

              return (
                <tr
                  key={i._id}
                  className="bg-green-200 hover:bg-green-300 transition border-b border-[#c9c3bd]"
                >
                  <td className="px-4 py-3 border border-[#d2ccc6]">{index + 1}</td>
                  <td className="px-4 py-3 border border-[#d2ccc6]">{i.billNo}</td>
                  <td className="px-4 py-3 border border-[#d2ccc6]">
                    {i.fullname || "-"}
                  </td>
                  <td className="px-4 py-3 border border-[#d2ccc6]">
                    {formatCurrency(totalAmount)}
                  </td>
                  <td className="px-4 py-3 border border-[#d2ccc6]">
                    {i.createdDate && i.createdTime
                      ? `${i.createdDate} ${i.createdTime}`
                      : "-"}
                  </td>
                  <td className="px-4 py-3 border border-[#d2ccc6] flex gap-3 text-xl">
                    {/* Arki invoice */}
                    <span
  className="cursor-pointer text-blue-600 hover:text-blue-800"
  onClick={() =>
    navigate("/receipt", { state: { invoice: i } })
  }
>
  👁️
</span>


                    {/* Lacagta la bixiyay */}
                    <span
                      className="cursor-pointer text-green-600 hover:text-green-800"
                      onClick={() => alert("💵 Lacagta waa la bixiyay!")}
                    >
                      ✏️
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LacagQabasho;
