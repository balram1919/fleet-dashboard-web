import api from "./axios";

export const getUsers = async (tenantId, limit = 10, offset = 1) => {
  const res = await api.get(`/tenant/${tenantId}/user?filter[role]=user&limit=${limit}&offset=${offset - 1}`);
  return res.data;
};

export const getUserPermissions = async (tenantId, limit = 10, offset = 1) => {
  const res = await api.get(`/tenant/${tenantId}/user-permissions?limit=${limit}&offset=${offset - 1}`);
  return res.data;
};