import axios, { type InternalAxiosRequestConfig } from "axios";
import { useAuthStore } from "@/store/useAuth";

// Extend Axios config to include skipAuth
interface AxiosConfig extends InternalAxiosRequestConfig {
  skipAuth?: boolean;
}

export const BASE_API = "https://fin.duitkas.com/api/v2/";

export const apiAuth = axios.create({
  baseURL: BASE_API,
});

export const api = axios.create({
  baseURL: BASE_API,
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

api.interceptors.request.use((config: AxiosConfig) => {
  if (!config.skipAuth) {
    const token = useAuthStore.getState().token;
    if (token) {
      config.headers["X-API-KEY"] = token;
    }
  }
  return config;
});
