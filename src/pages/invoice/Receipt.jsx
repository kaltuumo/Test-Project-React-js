import React, { useRef } from "react";
import { useLocation } from "react-router-dom";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import logo from "../../assets/images/logo.png"; // Your logo path

const Receipt = () => {
  const location = useLocation();
  const receiptRef = useRef(null);
  const invoice = location.state?.invoice;

  if (!invoice) return <p>No invoice data found!</p>;

  const usedKwh = invoice.afterRead - invoice.beforeRead;
  const totalAmount = usedKwh * Number(invoice.kwhUsed);

  const handleDownloadPdf = async () => {
    const canvas = await html2canvas(receiptRef.current, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF({ unit: "pt", format: "a4" });
    const pageWidth = pdf.internal.pageSize.getWidth();
    const imgProps = pdf.getImageProperties(imgData);
    const imgWidth = pageWidth - 40;
    const imgHeight = (imgProps.height * imgWidth) / imgProps.width;
    pdf.addImage(imgData, "PNG", 20, 20, imgWidth, imgHeight);
    pdf.save(`Receipt_${invoice.billNo}.pdf`);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Header Buttons */}
      <div className="flex justify-between mb-4">
        <button
          onClick={handleDownloadPdf}
          className="px-4 py-2 bg-[#2e6f7e] text-white rounded shadow"
        >
          🖨️ Print / PDF
        </button>
      </div>

      {/* Receipt Card */}
      <div
        ref={receiptRef}
        className="max-w-3xl mx-auto bg-white p-6 rounded-xl shadow-lg border border-gray-200"
      >
        {/* Logo & Company */}
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-4">
            <img src={logo} alt="Logo" className="h-16" />
            <div>
              <h2 className="text-xl font-bold">SHIRKADA ADEEGA KORONTADA EE BAXDO</h2>
              <p className="text-gray-600 text-sm">+252615501550 / +252614555665</p>
            </div>
          </div>

          <div className="text-right">
            <p className="text-gray-600 text-sm">Taariikh: {invoice.createdDate}</p>
            <p className="text-gray-600 text-sm">Receipt #: {invoice.billNo}</p>
            <p className="text-green-600 font-semibold">Status: Paid</p>
          </div>
        </div>

        <hr className="mb-4" />

        {/* Customer Info */}
        <div className="mb-4">
          <h3 className="text-lg font-semibold">RASIIDKA LACAG BIXINTA</h3>
          <p className="font-semibold mt-2">LACAG BIXIYAHA:</p>
          <p>{invoice.fullname}</p>
        </div>

        {/* Invoice Details */}
        <div className="mb-4 text-sm">
          <table className="w-full border-collapse text-sm">
            <tbody>
              <tr>
                <td className="py-1 font-semibold">UJEEDO / BILL #:</td>
                <td className="py-1">{invoice.billNo}</td>
              </tr>
              <tr>
                <td className="py-1 font-semibold">GURI #:</td>
                <td className="py-1">{invoice.houseNo}</td>
              </tr>
              <tr>
                <td className="py-1 font-semibold">MACHINE / LAM:</td>
                <td className="py-1">{invoice.metroNo || "M00006"}</td>
              </tr>
              <tr>
                <td className="py-1 font-semibold">LACAGTA LA BIXIYAY:</td>
                <td className="py-1">${totalAmount.toFixed(2)}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Notes / Faahfaahin */}
        <div className="mb-6 text-sm">
          <p>Faahfaahin: Lacagta waa la qabtay, dib u celin ma jirto. MAHADSANID.</p>
        </div>

        {/* Signature */}
        <div className="flex justify-between items-center mt-6">
          <div className="text-center">
            <p className="text-gray-600">__________________________</p>
            <p className="text-sm font-semibold">Saxiixa / Signature</p>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 text-center text-xs text-gray-500">
          <p>Powered by: Darmaan Tech LLC.</p>
        </div>
      </div>
    </div>
  );
};

export default Receipt;
