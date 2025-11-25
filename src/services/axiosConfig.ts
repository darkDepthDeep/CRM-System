import axios, { type AxiosRequestConfig } from "axios";
import { tokenService } from "../utils/tokenService";

const BASE_URL = "https://easydev.club/api/v1";

export const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 100000,
  headers: { "Content-Type": "application/json" },
});

apiClient.interceptors.request.use((config) => {
  const token = tokenService.getAccessToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

const isAuthEndpoint = (url: string | undefined): boolean => {
  return url?.startsWith("/auth/") ?? false;
};

let isRefreshing = false;
let refreshSubscribers: Array<(token: string) => void> = [];

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config as AxiosRequestConfig & {
      _retry?: boolean;
    };

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !isAuthEndpoint(originalRequest.url)
    ) {
      if (isRefreshing) {
        return new Promise((resolve) => {
          refreshSubscribers.push((token) => {
            originalRequest.headers = {
              ...originalRequest.headers,
              Authorization: `Bearer ${token}`,
            };
            resolve(apiClient(originalRequest));
          });
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const response = await apiClient.post<{ accessToken: string }>(
          "/auth/refresh"
        );
        const newAccessToken = response.data.accessToken;

        tokenService.setAccessToken(newAccessToken);
        refreshSubscribers.forEach((cb) => cb(newAccessToken));
        refreshSubscribers = [];
        isRefreshing = false;

        originalRequest.headers = {
          ...originalRequest.headers,
          Authorization: `Bearer ${newAccessToken}`,
        };

        return apiClient(originalRequest);
      } catch (refreshError) {
        isRefreshing = false;
        refreshSubscribers = [];
        tokenService.clearAccessToken();
        window.location.href = "/auth";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);
