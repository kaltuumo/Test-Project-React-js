import { useState, useEffect } from "react";
import api from "../../api/api";
import { ApiConstants } from "../../api/ApiConstants";

export default function useInvoice() {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchInvoices = async () => {
    try {
      setLoading(true);
      const res = await api.get(`${ApiConstants.invoiceEndpoint}/all-invoice`);
      console.log("Fetched invoices:", res.data); // ✅ debug
      // fix here: take data array instead of result
      setInvoices(res.data.data || []);
    } catch (err) {
      console.error("Error fetching invoices:", err);
    } finally {
      setLoading(false);
    }
  };

  const createInvoice = async (data) => {
    try {
      setLoading(true);

      // Auto-generate HouseNo & WatchNo if empty
      let lastInvoice = invoices.length ? invoices[invoices.length - 1] : null;

      if (!data.houseNo) {
        const lastHouse = lastInvoice ? parseInt(lastInvoice.houseNo.replace(/\D/g, "")) : 0;
        data.houseNo = "H" + String(lastHouse + 1).padStart(3, "0");
      }
      if (!data.watchNo) {
        const lastWatch = lastInvoice ? parseInt(lastInvoice.watchNo.replace(/\D/g, "")) : 0;
        data.watchNo = "W" + String(lastWatch + 1).padStart(3, "0");
      }

      const res = await api.post(`${ApiConstants.invoiceEndpoint}/create-invoice`, data);
      setInvoices(prev => [...prev, res.data.result]);
      return res.data;
    } catch (err) {
      console.error(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInvoices();
  }, []);

  return { invoices, loading, fetchInvoices, createInvoice };
}
