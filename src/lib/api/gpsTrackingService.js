import api from "./axios";

export const getVinNumber = async (tenantId) => {
  const res = await api.get(`/tenant/${tenantId}/assets/autocomplete`);

  return res.data;
};

export const getTelemetry = async (tenantId, vinId) => {
  const res = await api.get(`/tenant/${tenantId}/assets/${"91eafb8d-0f42-4155-b774-95e78457ad6f"}/telemetry`);

  return res.data;
};
