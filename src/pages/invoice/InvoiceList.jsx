import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useInvoice from "../../hooks/invoice/useInvoice";

const InvoiceList = () => {
  const navigate = useNavigate();
  const { invoices, loading, fetchInvoices } = useInvoice(); // ✅ Correct

  const [search, setSearch] = useState("");

  // Filter invoices by name or phone
 const filteredInvoices = invoices.filter(invoice =>
  invoice.fullname?.toLowerCase().includes(search.toLowerCase()) ||
  invoice.phone?.toLowerCase().includes(search.toLowerCase())
);


  // Fetch invoices on mount
  useEffect(() => {
    fetchInvoices();
  }, []);

  if (loading) {
    return <p>Loading invoices...</p>;
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-5 text-white bg-[#2e6f7e] p-4 rounded-lg shadow-lg">
        Invoice Management
      </h1>

      {/* Search */}
      <input
        type="text"
        placeholder="Search by Name or Phone..."
        className="border px-4 py-2 rounded w-full mb-6"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Invoice Table */}
      <div className="mt-6  overflow-hidden shadow-2xl border border-[#2e4a62] bg-[#f5f0e9]">
        <table className="min-w-full text-left text-sm border-collapse">
          <thead>
            <tr className="bg-[#2e6f7e] text-white text-[15px]">
              <th className="px-4 py-3 border border-[#1f3e4d]">#</th>
              <th className="px-4 py-3 border border-[#1f3e4d]">Bill No</th>
              <th className="px-4 py-3 border border-[#1f3e4d]">Macaamiil</th>
              <th className="px-4 py-3 border border-[#1f3e4d]">Total</th>
              <th className="px-4 py-3 border border-[#1f3e4d]">Status</th>
              <th className="px-4 py-3 border border-[#1f3e4d]">Paid</th>
              <th className="px-4 py-3 border border-[#1f3e4d]">Remaining</th>
              <th className="px-4 py-3 border border-[#1f3e4d]">Created</th>
              <th className="px-4 py-3 border border-[#1f3e4d]">Action</th>
            </tr>
          </thead>

          <tbody>
            {filteredInvoices.length === 0 && (
              <tr>
                <td colSpan={8} className="px-4 py-3 text-center">
                  No invoices found.
                </td>
              </tr>
            )}

            {filteredInvoices.map((i, index) => {
              const usedKwh =
                i.afterRead - i.beforeRead > 0
                  ? i.afterRead - i.beforeRead
                  : 0;
              const totalAmount = usedKwh * Number(i.kwhUsed);
              const required = totalAmount - Number(i.discount);
              const remaining = Math.max(required - Number(i.paid), 0);
              const paid = Number(i.paid) 

              const rowColor =
                i.status === "Paid"
                  ? "bg-green-300"
                  : i.status === "Unpaid"
                  ? "bg-red-300"
                  : i.status === "Pending"
                  ? "bg-yellow-300"
                  : "bg-[#f7f3ee]";

              return (
                <tr
                  key={i._id}
                  className={`${rowColor} hover:bg-[#f1ebe4] transition border-b border-[#c9c3bd]`}
                >
                  <td className="px-4 py-3 border border-[#d2ccc6]">{index + 1}</td>
                  <td className="px-4 py-3 border border-[#d2ccc6]">{i.billNo}</td>

                  <td className="px-4 py-3 border border-[#d2ccc6]">
                    {i.fullname && i.houseNo && i.watchNo
                      ? `${i.fullname} - ${i.houseNo} - ${i.watchNo}`
                      : "-"}
                  </td>

                  <td className="px-4 py-3 border border-[#d2ccc6]">
                    {totalAmount.toFixed(2)}
                  </td>

                  <td
                    className={`px-4 py-3 border border-[#d2ccc6] font-semibold ${
                      i.status === "Paid"
                        ? "text-green-700"
                        : i.status === "Unpaid"
                        ? "text-red-700"
                        : "text-yellow-700"
                    }`}
                  >
                    {i.status}
                  </td>
                   <td className="px-4 py-3 border border-[#d2ccc6]">
                    {paid.toFixed(2)}
                  </td>
                  <td className="px-4 py-3 border border-[#d2ccc6]">
                    {remaining.toFixed(2)}
                  </td>

                  <td className="px-4 py-3 border border-[#d2ccc6]">
                    {i.createdDate && i.createdTime
                      ? `${i.createdDate} ${i.createdTime}`
                      : "-"}
                  </td>

                  <td className="px-4 py-3 border border-[#d2ccc6] flex gap-3 text-xl">
                    <span
                      className="cursor-pointer text-orange-600 hover:text-orange-800"
                      onClick={() =>
                        navigate("/customer-update", { state: { electric: i } })
                      }
                    >
                      ✏️
                    </span>

                    <span
                      className="cursor-pointer text-blue-600 hover:text-blue-800"
                      onClick={() =>
                        navigate("/invoice-payment", { state: { invoice: i } })
                      }
                    >
                      👁️
                    </span>

               <span
  className="cursor-pointer text-green-600 hover:text-green-800"
  onClick={() => {
    if (i.status === "Paid") {
      alert("💵 Lacagta waa la bixiyay, Mahadsanid!");
    } else {
      navigate("/receipt-payment", { state: { invoice: i } });
    }
  }}
>
  💰
</span>


                    {i.status === "Pending" && (
                      <span
                        className="cursor-pointer text-yellow-600 hover:text-yellow-800"
                        onClick={() =>
                          navigate("/receipt-payment", { state: { invoice: i } })
                        }
                      >
                        ➡️
                      </span>
                    )}
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

export default InvoiceList;
