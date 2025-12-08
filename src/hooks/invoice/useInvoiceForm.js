import { useState, useEffect } from "react";

export default function useInvoiceForm(initialValues = {}) {
  const [fullname, setFullname] = useState(initialValues.fullname || "");
  const [phone, setPhone] = useState(initialValues.phone || "");
  const [zone, setZone] = useState(initialValues.zone || "");
  const [area, setArea] = useState(initialValues.area || "");
  const [beforeRead, setBeforeRead] = useState(initialValues.beforeRead || 0);
  const [afterRead, setAfterRead] = useState(initialValues.afterRead || 0);
  const [discount, setDiscount] = useState(initialValues.discount || 0);
  const [paid, setPaid] = useState(initialValues.paid || 0);
  const [month, setMonth] = useState(initialValues.month || "");
  const [status, setStatus] = useState(initialValues.status || "Unpaid");
  const [houseNo, setHouseNo] = useState(initialValues.houseNo || "");
  const [watchNo, setWatchNo] = useState(initialValues.watchNo || "");
  
  // Calculated fields
  const [kwhUsed, setKwhUsed] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [required, setRequired] = useState(0);
  const [remaining, setRemaining] = useState(0);

  const [loading, setLoading] = useState(false);

  const UNIT_PRICE = 0.5; // 1 currency per kWh, adjust as needed

  // Auto-calculate fields whenever relevant values change
  useEffect(() => {
     const calculatedKwh = Math.max(afterRead - beforeRead, 0);
  const UNIT_PRICE = 0.5; // price per kWh
  const calculatedTotal = calculatedKwh * UNIT_PRICE;
  const calculatedRequired = calculatedTotal - discount;
  const calculatedRemaining = Math.max(calculatedRequired - paid, 0);


    setKwhUsed(calculatedKwh);
  setTotalAmount(calculatedTotal);
  setRequired(calculatedRequired);
  setRemaining(calculatedRemaining);
}, [beforeRead, afterRead, discount, paid]);

  const resetForm = () => {
    setFullname("");
    setPhone("");
    setZone("");
    setArea("");
    setBeforeRead(0);
    setAfterRead(0);
    setDiscount(0);
    setPaid(0);
    setMonth("");
    setStatus("Unpaid");
    setHouseNo("");
    setWatchNo("");
    setKwhUsed(0);
    setTotalAmount(0);
    setRequired(0);
    setRemaining(0);
  };

  return {
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
  kwhUsed, setKwhUsed,   // ✅ Halkan waa in la add gareeyaa
    loading, setLoading,
    resetForm
  };
}
