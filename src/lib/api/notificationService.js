import api from "./axios";

export const getAlertAndNotification = async (tenantId, limit = 10, offset = 0) => {
  const res = await api.get(`/tenant/${tenantId}/notifications?limit=${limit}&offset=${offset}`);

  return res.data;
};