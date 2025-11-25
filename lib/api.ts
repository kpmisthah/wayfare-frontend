
import axios from "axios";
import { useAuthStore } from "@/store/Auth";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});


let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (
      originalRequest.url.includes("/auth/signin") ||
      originalRequest.url.includes("/auth/signup") ||
      originalRequest.url.includes("/auth/refresh") ||
      originalRequest.url.includes("/auth/logout") ||
      originalRequest.url.includes("/auth/google")
    ) {
      return Promise.reject(error);
    }

    const status = error.response?.status;


    if (status === 403) {
      const message = error.response?.data?.message || "";
      if (message.toLowerCase().includes("block")) {
        if (typeof window !== "undefined") {
          useAuthStore.getState().clearAuth();
          window.location.href = "/login?blocked=true";
        }
        return Promise.reject(error);
      }
    }

    if (status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then(() => api(originalRequest))
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        await api.post("/auth/refresh");
        // Refresh succeeded → retry original request
        processQueue(null);
        return api(originalRequest);
      } catch (refreshError: any) {
        processQueue(refreshError);

        if (typeof window !== "undefined") {
          useAuthStore.getState().clearAuth();
          const currentPath = window.location.pathname;
          if (!currentPath.includes("/login") && !currentPath.includes("/signup")) {
            window.location.href = "/login?session=expired";
          }
        }
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default api;