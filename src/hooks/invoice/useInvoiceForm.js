import { useState, useEffect } from "react";

export default function useInvoiceForm(initialValues = {}) {
  const [fullname, setFullname] = useState(initialValues.fullname || "");
  const [phone, setPhone] = useState(initialValues.phone || "");
  const [zone, setZone] = useState(initialValues.zone || "");
  const [area, setArea] = useState(initialValues.area || "");
  const [beforeRead, setBeforeRead] = useState(initialValues.beforeRead || 0);
  const [afterRead, setAfterRead] = useState(initialValues.afterRead || 0);
  const [kwhUsed, setKwhUsed] = useState(initialValues.kwhUsed || 0);
  const [discount, setDiscount] = useState(initialValues.discount || 0);
  const [month, setMonth] = useState(initialValues.month || "");
  const [status, setStatus] = useState(initialValues.status || "Unpaid");
  const [houseNo, setHouseNo] = useState(initialValues.houseNo || "");
  const [watchNo, setWatchNo] = useState(initialValues.watchNo || "");
  const [paid, setPaid] = useState(initialValues.paid || 0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [required, setRequired] = useState(0);
  const [remaining, setRemaining] = useState(0);

  // ✅ calculate totals automatically
  useEffect(() => {
    const total = ((afterRead - beforeRead) * kwhUsed).toFixed(2);
    const req = (total - discount).toFixed(2);
    const rem = Math.max(req - paid, 0).toFixed(2);
    setTotalAmount(Number(total));
    setRequired(Number(req));
    setRemaining(Number(rem));
  }, [beforeRead, afterRead, kwhUsed, discount, paid]);

  return {
    fullname, setFullname,
    phone, setPhone,
    zone, setZone,
    area, setArea,
    beforeRead, setBeforeRead,
    afterRead, setAfterRead,
    kwhUsed, setKwhUsed,
    discount, setDiscount,
    month, setMonth,
    status, setStatus,
    houseNo, setHouseNo,
    watchNo, setWatchNo,
    paid, setPaid,
    totalAmount,
    required,
    remaining
  };
}
