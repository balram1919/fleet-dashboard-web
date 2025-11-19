import api from "./axios";

export const getAlertAndNotification = async (tenantId, limit = 10, offset = 0, startDate,
  endDate) => {
  const res = await api.get(`/tenant/${tenantId}/notifications?limit=${limit}&offset=${offset}${startDate && endDate ? `&start=${startDate}&stop=${endDate}` : ''}`);

  return res.data;
};