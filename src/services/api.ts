import axios from "axios";
import { useAuthStore } from "@/store/useAuth";

export const BASE_API = "/api";

export const api = axios.create({
  baseURL: BASE_API,
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;
  if (token) {
    config.headers["X-API-KEY"] = token;
  }
  return config;
});

export const dataAccount: {
  id: number;
  vo: number;
  name: string;
  nameAccount: string;
  admin: number;
  amount: number;
}[] = [
  {
    id: 1,
    vo: 430676358,
    name: "BNI",
    nameAccount: "BNI-Kas",
    admin: 100000,
    amount: 100000,
  },
  {
    id: 2,
    vo: 839487364,
    name: "Mandiri",
    nameAccount: "Mandiri-Giro",
    admin: 7500,
    amount: 250000,
  },
  {
    id: 3,
    vo: 88366234,
    name: "Jago Syariah",
    nameAccount: "Jago-Transfer",
    admin: 0,
    amount: 300000,
  },
];
