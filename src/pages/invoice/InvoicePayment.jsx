import React, { useRef } from "react";
import { useLocation } from "react-router-dom";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import logo from "../../assets/images/logo.png";

export default function InvoiceGenerator({ filename = "invoice" }) {
  const invoiceRef = useRef(null);
  const location = useLocation();
  const invoice = location.state?.invoice;

  if (!invoice) return <p>No invoice data found!</p>;

  // Company info
  const company = {
    name: "Bahdo Electricity Co.",
    logo: logo,
    address: "123 Energy St, Hargeisa",
    phone: "+252 61 000 000",
    email: "info@bahdoelectricity.com",
    website: "www.bahdoelectricity.com",
  };

  // Payment Contacts
  const payment = {
    evc: "*770*616001#",
    zaad: "*200*612345678#",
    sahal: "*799*615556666#",
    bank: "IBAN: SO123456789 • Premier Bank",
  };

  // Calculations
  const usedKwh = invoice.afterRead - invoice.beforeRead;
  const totalAmount = usedKwh * Number(invoice.kwhUsed);
  const required = totalAmount - Number(invoice.discount);
  const remaining = Math.max(required - Number(invoice.paid), 0);

  // PDF EXPORT
  const handleDownloadPdf = async () => {
    const canvas = await html2canvas(invoiceRef.current, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF({ unit: "pt", format: "a4" });

    const pageWidth = pdf.internal.pageSize.getWidth();
    const imgProps = pdf.getImageProperties(imgData);
    const imgWidth = pageWidth - 40;
    const imgHeight = (imgProps.height * imgWidth) / imgProps.width;

    pdf.addImage(imgData, "PNG", 20, 20, imgWidth, imgHeight);
    pdf.save(`${invoice.billNo}.pdf`);
  };

  // EXCEL EXPORT
  const handleDownloadExcel = () => {
    const sheetData = [
      ["Field", "Value"],
      ["Invoice No", invoice.billNo],
      ["Full Name", invoice.fullname],
      ["Phone", invoice.phone],
      ["House No", invoice.houseNo],
      ["Area", invoice.area],
      ["Zone", invoice.zone],
      ["Metro No", invoice.metroNo],
      ["Before Read", invoice.beforeRead],
      ["After Read", invoice.afterRead],
      ["Used kWh", usedKwh],
      ["Rate", invoice.kwhUsed],
      ["Total Amount", totalAmount],
      ["Discount", invoice.discount],
      ["Paid Amount", invoice.paid],
      ["Remaining", remaining],
      ["Status", invoice.status],
      ["Created Date", `${invoice.createdDate} ${invoice.createdTime}`],
    ];

    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.aoa_to_sheet(sheetData);

    XLSX.utils.book_append_sheet(wb, ws, "Invoice");
    const wbout = XLSX.write(wb, { bookType: "xlsx", type: "array" });

    saveAs(new Blob([wbout]), `${invoice.billNo}.xlsx`);
  };

  return (
    <div className="p-4 bg-gray-100 min-h-screen">

      {/* Export Buttons */}
      <div className="flex justify-end gap-3 mb-4">
        <button
          onClick={handleDownloadExcel}
          className="px-4 py-2 rounded-md border shadow-sm bg-white"
        >
          Export Excel
        </button>

        <button
          onClick={handleDownloadPdf}
          className="px-4 py-2 rounded-md border shadow-sm bg-[#2e6f7e] text-white"
        >
          Download PDF
        </button>
      </div>

      {/* Invoice Card */}
      <div
        ref={invoiceRef}
        className="max-w-3xl mx-auto bg-white p-6 rounded-xl shadow-lg border border-gray-200"
      >

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <img src={company.logo} alt="logo" style={{ height: 120 }} />
            <div>
              <h2 className="text-xl font-bold">{company.name}</h2>
              <p className="text-gray-600 text-sm">{company.address}</p>
              <p className="text-gray-600 text-sm">
                {company.phone} • {company.email}
              </p>
              <p className="text-gray-600 text-sm">{company.website}</p>
            </div>
          </div>

          <div className="text-right">
            <h3 className="text-2xl font-bold text-[#2e6f7e]">INVOICE</h3>
            <p className="text-gray-600 text-sm">#{invoice.billNo}</p>
            <p className="text-gray-600 text-sm">
              {invoice.createdDate} {invoice.createdTime}
            </p>
          </div>
        </div>

        <hr className="mb-6" />

        {/* Customer + Summary */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          {/* Customer Details */}
          <div>
            <h4 className="font-semibold text-sm">Bill To</h4>
            <p className="text-sm">{invoice.fullname}</p>
            <p className="text-gray-600 text-sm">Phone: {invoice.phone}</p>
            <p className="text-gray-600 text-sm">House: {invoice.houseNo}</p>
            <p className="text-gray-600 text-sm">
              Area/Zone: {invoice.area} / {invoice.zone}
            </p>
            <p className="text-gray-600 text-sm">Metro No: {invoice.metroNo}</p>
          </div>

          {/* Summary */}
          <div>
            <h4 className="font-semibold text-sm">Summary</h4>

            <div className="flex justify-between mt-2">
              <span>Total Amount</span>
              <span>{totalAmount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between mt-2">
              <span>Paid</span>
              <span>{Number(invoice.paid).toFixed(2)}</span>
            </div>
            <div className="flex justify-between mt-2">
              <span>Remaining</span>
              <span className={remaining === 0 ? "text-green-600" : "text-red-600"}>
                {remaining.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between mt-2">
              <span>Status</span>
              <span className="font-semibold">{invoice.status}</span>
            </div>
          </div>
        </div>

        {/* Table */}
        <table className="w-full border-collapse mb-6 text-left">
          <thead>
            <tr className="bg-gray-100 text-sm">
              <th className="border px-3 py-2 w-[20%]">Description</th>
              <th className="border px-3 py-2 text-center">Aqris Hore</th>
              <th className="border px-3 py-2 text-center">Aqris Dambe</th>
              <th className="border px-3 py-2 text-center">Used kWh</th>
              <th className="border px-3 py-2 text-center">Rate</th>
              <th className="border px-3 py-2 text-right">Amount</th>
            </tr>
          </thead>

          <tbody>
            <tr className="text-sm">
              <td className="border px-3 py-2">Electricity Usage</td>
              <td className="border px-3 py-2 text-center">{invoice.beforeRead}</td>
              <td className="border px-3 py-2 text-center">{invoice.afterRead}</td>
              <td className="border px-3 py-2 text-center">{usedKwh}</td>
              <td className="border px-3 py-2 text-center">{invoice.kwhUsed}</td>
              <td className="border px-3 py-2 text-right">
                {totalAmount.toFixed(2)}
              </td>
            </tr>
          </tbody>
        </table>


<div className="text-sm text-gray-600 mt-4">
  <p><strong>Notes:</strong> Mahadsanid isticmaalka adeegeena.</p>
  <p>Fadlan bixinta hore si looga fogaado jarista korontada.</p>
</div>

{/* Signature Section */}
<div className="mt-8 flex justify-between items-center">
  <div className="text-center">
    <p className="text-gray-600">__________________________</p>
    <p className="text-sm font-semibold">Saxiixa Macmiilka</p>
  </div>
  <div className="text-center">
    <p className="text-gray-600">__________________________</p>
    <p className="text-sm font-semibold">Saxiixa Shirkadda</p>
  </div>
</div>

        {/* Footer */}
        <div className="text-sm text-gray-600 mt-4">
          <p><strong>Notes:</strong> Mahadsanid isticmaalka adeegeena.</p>
          <p>Fadlan bixinta hore si looga fogaado jarista korontada.</p>
        </div>
      </div>
    </div>
  );
}
