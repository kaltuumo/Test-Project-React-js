import { useState } from "react";

export default function useCustomerForm(initialValues = {}) {
  const [fullname, setFullname] = useState(initialValues.fullname || "");
  const [phone, setPhone] = useState(initialValues.phone || "");
  const [gender, setGender] = useState(initialValues.gender || "");
  const [statusPerson, setStatusPerson] = useState(initialValues.statusPerson || "");
  const [damiin, setDamiin] = useState(initialValues.damiin || "");
  const [damiinPhone, setDamiinPhone] = useState(initialValues.damiinPhone || "");
  const [loading, setLoading] = useState(false);

  const resetForm = () => {
    setFullname("");
    setPhone("");
    setGender("");
    setStatusPerson("");
    setDamiin("");
    setDamiinPhone("");
  };

  return {
    fullname, setFullname,
    phone, setPhone,
    gender, setGender,
    statusPerson, setStatusPerson,
    damiin, setDamiin,
    damiinPhone, setDamiinPhone,
    loading, setLoading,
    resetForm
  };
}
