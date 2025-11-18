import { useAuthStore } from "@/store/Auth";
import axios from "axios";

const api = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}`,
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      originalRequest._retry ||
      originalRequest.url.includes("/auth/refresh") ||
      originalRequest.url.includes("/auth/logout")
    ) {
      return Promise.reject(error);
    }

    const errorCode = error?.response?.data?.code;
    const status = error?.response?.status;

    if (status === 401 || status === 403) {
      if (errorCode === "USER_BLOCKED" || errorCode === "AGENCY_PENDING") {
        if (typeof window !== "undefined") {
          window.location.href = "/login";
        }
        return Promise.reject(error);
      }

      originalRequest._retry = true;
      try {
        await api.post("/auth/refresh");
        return api(originalRequest);
      } catch (refreshError) {
        if (typeof window !== "undefined") {
           useAuthStore.getState().clearAuth();
          window.location.href = "/login";
        }
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);


export default api;
