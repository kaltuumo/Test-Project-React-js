import { useState } from "react";

export default function useElectricForm(initialValues = {}) {
  const [customerNo, setCustomerNo] = useState(initialValues.customerNo || "");
  const [houseNo, setHouseNo] = useState(initialValues.houseNo || "");
  const [electricType, setElectricType] = useState(initialValues.electricType || "");
  const [statusElectric, setStatusElectric] = useState(initialValues.statusType || "");
  const [loading, setLoading] = useState(false);

  const resetForm = () => {
    setCustomerNo("");
    setHouseNo("");
    setElectricType("");
    setStatusElectric("");
  };

  return {
    customerNo, setCustomerNo,
    houseNo, setHouseNo,
    electricType, setElectricType,
    statusElectric, setStatusElectric,
    loading, setLoading,
    resetForm
  };
}
