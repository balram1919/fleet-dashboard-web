import api from "./axios";

export const getProfile = async () => {
  const res = await api.get("/auth/me");
  return res.data;
};