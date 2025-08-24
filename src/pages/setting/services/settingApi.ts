import { api } from "@/services/api";
import type {
  SettingProps,
  UserSettingProps,
  UserDetailSettingsProps,
  OfficeSettingsProps,
  OfficeDetailSettingsProps,
} from "../types/setting";
import type { ResponseProps } from "@/types/response";

export const fetchSettings = async (): Promise<SettingProps> => {
  const response = await api.get("konfigurasi");

  return response.data;
};

// User Settings
export const fetchUserSettings = async (): Promise<UserSettingProps> => {
  const response = await api.get("user");

  return response.data;
};

export const fetchUserDetailSettings = async (
  id: string
): Promise<
  ResponseProps & {
    data: UserDetailSettingsProps;
  }
> => {
  const response = await api.get(`user/detail/${id}`);
  return response.data;
};

export const postUserSettings = async (
  formData: FormData
): Promise<ResponseProps & { data: { inser_id: string } }> => {
  const response = await api.post("user/tambah-user", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return response.data;
};

export const putUserSettings = async (
  formData: FormData
): Promise<ResponseProps & { data: { affected_rows: number } }> => {
  const response = await api.post("user/edit-user", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return response.data;
};
// end User Settings

// Office Settings
export const fetchOfficeSettings = async (): Promise<OfficeSettingsProps> => {
  const response = await api.get("kantor");

  return response.data;
};
export const fetchOfficeDetailSettings = async (
  id: string
): Promise<
  ResponseProps & {
    data: OfficeDetailSettingsProps;
  }
> => {
  const response = await api.get(`kantor/detail/${id}`);
  return response.data;
};
export const postOfficeSettings = async (
  formData: FormData
): Promise<ResponseProps & { data: { inser_id: string } }> => {
  const response = await api.post("kantor/tambah-kantor", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return response.data;
};
export const putOfficeSettings = async (
  formData: FormData
): Promise<ResponseProps & { data: { affected_rows: number } }> => {
  const response = await api.post("kantor/edit-kantor", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return response.data;
};
// end Office Settings
