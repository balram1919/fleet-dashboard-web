import api from "./axios";

export const getVinNumber = async (tenantId = "30fc8580-45cc-4bad-95ba-9432318233a9") => {
  const res = await api.get(`/tenant/${tenantId}/asset/autocomplete`);

  return res.data;
};

export const getTelemetry = async (tenantId = "30fc8580-45cc-4bad-95ba-9432318233a9", vinId = "fc86cbb1-8937-41cb-84df-425af234e025") => {
  const res = await api.get(`/tenant/${tenantId}/assets/${vinId}/telemetry`);

  return res.data;
};
