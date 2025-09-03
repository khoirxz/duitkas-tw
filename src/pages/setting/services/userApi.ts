import { api } from "@/services/api";
import type {
  UserSettingProps,
  UserDetailSettingsProps,
} from "../types/setting";
import type { ResponseProps } from "@/types/response";

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

export const deleteUserSettings = async (
  id: string
): Promise<
  ResponseProps & {
    data: {
      affected_rows: number;
    };
  }
> => {
  const response = await api.delete(`user/hapus-user/${id}`);
  return response.data;
};
// end User Settings
