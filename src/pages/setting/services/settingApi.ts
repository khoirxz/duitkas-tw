import { api } from "@/services/api";
import type { SettingProps } from "../types/setting";

export const fetchSettings = async (): Promise<SettingProps> => {
  const response = await api.get("konfigurasi");

  return response.data;
};
