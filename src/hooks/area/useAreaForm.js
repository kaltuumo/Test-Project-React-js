import { useState } from "react";

export default function useZoneForm(initialValues = {}) {
  const [areaName, setAreaName] = useState(initialValues.areaName || "");
  const [zoneName, setZoneName] = useState(initialValues.zoneName || "");
  const [description, setDescription] = useState(initialValues.description || "");
  const [loading, setLoading] = useState(false);

  const resetForm = () => {
    setAreaName("");
    setZoneName("");
    setDescription("");
  };

  return {
    areaName, setAreaName,
    zoneName, setZoneName,
    description, setDescription,
    loading, setLoading,
    resetForm
  };
}
