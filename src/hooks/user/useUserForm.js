import { useState } from "react";

export default function useUserForm(initialValues = {}) {
  const [fullname, setFullname] = useState(initialValues.fullname || "");
  const [phone, setPhone] = useState(initialValues.phone || "");
  const [email, setEmail] = useState(initialValues.email || "");
  const [password, setPassword] = useState(initialValues.password || "");
  const [role, setRole] = useState(initialValues.role || "");
  const [status, setStatus] = useState(initialValues.status || "");
  const [loading, setLoading] = useState(false);

  const resetForm = () => {
    setFullname("");
    setPhone("");
    setEmail("");
    setPassword("");
    setRole("");
    setStatus("");
  };

  return {
    fullname, setFullname,
    phone, setPhone,
    email, setEmail,
    password, setPassword,
    role, setRole,
    status, setStatus,
    loading, setLoading,
    resetForm
  };
}
