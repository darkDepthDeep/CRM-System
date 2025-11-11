import axios, { type AxiosRequestConfig } from "axios";
import { tokenStorage } from "../utils/tokenStorage";
import { refreshAccessToken } from "../utils/refreshAccessToken";

const BASE_URL = 'https://easydev.club/api/v1';

export const apiClient = axios.create({
    baseURL: BASE_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json'
    }
});

apiClient.interceptors.request.use((config) => {
    const token = tokenStorage.getAccessToken();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

const isAuthEndpoint = (url: string | undefined): boolean => {
    return url?.startsWith('/auth/') ?? false;
}

let isRefreshing = false;
let refreshSubscribers: Array<(token: string) => void> = [];

const onRefreshed = (token: string) => {
    refreshSubscribers.forEach(callback => callback(token));
    refreshSubscribers = [];
};
    
const addRefreshSubscriber = (callback: (token: string) => void) => {
    refreshSubscribers.push(callback);
};

apiClient.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean };

        if (error.response?.status === 401 && !originalRequest._retry && !isAuthEndpoint(originalRequest.url)) {
            if (isRefreshing) {
                return new Promise((resolve) => {
                    addRefreshSubscriber((token) => {
                        originalRequest.headers = originalRequest.headers || {};
                        originalRequest.headers.Authorization = `Bearer ${token}`;
                        resolve(apiClient(originalRequest));
                    });
                });
            }

            originalRequest._retry = true;
            isRefreshing = true;

            try {
                const newAccessToken = await refreshAccessToken();

                if (!newAccessToken) {
                    tokenStorage.removeTokens();
                    window.location.href = '/auth';
                    return Promise.reject(error);
                }

                originalRequest.headers = originalRequest.headers || {};
                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                onRefreshed(newAccessToken);
                isRefreshing = false;
                return apiClient(originalRequest);
            } catch (error) {
                isRefreshing = false;
                tokenStorage.removeTokens();
                window.location.href = '/auth';
                return Promise.reject(error);
            }
        }

        return Promise.reject(error);
    }
);