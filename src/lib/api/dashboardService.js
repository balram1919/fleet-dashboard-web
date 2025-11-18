import api from "./axios";

export const getDashbaordMapData = async (tenantId) => {
  const res = await api.get(`/tenant/${tenantId}/assets/telemetry?limit=1&order=desc&fields[]=lat&fields[]=lon`);
  return res.data;
};


export const getdailyTraffic = async (tenantId, start, stop) => {
  const res = await api.get(`https://api.athena-system.com/api/tenant/${tenantId}/assets/activity?start=${start}&stop=${stop}&windowType=daily`);
  return res.data;
};


export const getdailyHourly = async (tenantId, start, stop) => {
  const res = await api.get(`https://api.athena-system.com/api/tenant/${tenantId}/assets/activity?start=${start}&stop=${stop}&windowType=hourly`);
  return res.data;
};