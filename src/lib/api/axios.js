import axios from "axios";
import { handleApiError } from "../error/apiError";
import { getAccessToken, refreshToken } from "../auth/tokens";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: false,
});

// Attach JWT
api.interceptors.request.use((config) => {
  const token = getAccessToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Handle errors + refresh token
api.interceptors.response.use(
  (res) => res,
  async (err) => {
    // Trigger refresh if 401
    const original = err.config;
    if (err.response?.status === 401 && !original._retry) {
      original._retry = true;
      const newToken = await refreshToken();
      if (newToken) {
        original.headers.Authorization = `Bearer ${newToken}`;
        return api(original);
      }
    }

    return Promise.reject(handleApiError(err));
  }
);

export default api;
