import { api } from "@/services/api";
import type {
  OfficeSettingsProps,
  OfficeDetailSettingsProps,
} from "../types/setting";
import type { ResponseProps } from "@/types/response";

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

export const deleteOfficeSettings = async (
  id: string
): Promise<ResponseProps & { data: { affected_rows: number } }> => {
  const response = await api.delete(`kantor/hapus-kantor/${id}`);
  return response.data;
};
// end Office Settings
