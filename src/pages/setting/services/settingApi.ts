import { api } from "@/services/api";
import type { SettingProps } from "../types/setting";
import type { ResponseProps } from "@/types/response";

export const fetchSettings = async (): Promise<SettingProps> => {
  const response = await api.get("konfigurasi");

  return response.data;
};

export const checkIdentity = async (
  formData: FormData
): Promise<
  ResponseProps & {
    data: {
      tersedia: boolean;
    };
  }
> => {
  const response = await api.post("konfigurasi/check-identitas", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return response.data;
};

export const updateSettings = async (
  formData: FormData
): Promise<SettingProps> => {
  const response = await api.post("konfigurasi", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};
