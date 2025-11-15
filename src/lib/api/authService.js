import api from "./axios";
import { setAccessToken } from "../auth/tokens";

export const login = async (email, password) => {
  const res = await api.post("/auth/sign-in", { email, password });
  setAccessToken(res.data);
  return res.data;
};
