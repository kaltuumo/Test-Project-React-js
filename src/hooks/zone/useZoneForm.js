import { useState } from "react";

export default function useZoneForm(initialValues = {}) {
  const [zoneName, setZoneName] = useState(initialValues.zoneName || "");
  const [description, setDescription] = useState(initialValues.description || "");
  const [loading, setLoading] = useState(false);

  const resetForm = () => {
    setZoneName("");
    setDescription("");
  };

  return {
    zoneName, setZoneName,
    description, setDescription,
    loading, setLoading,
    resetForm
  };
}
