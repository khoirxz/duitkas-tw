import { api } from "@/services/api";
import type { ResponseProps } from "@/types/response";
import type { AuthResponseProps } from "../types/auth";

export const login = async (
  formData: FormData
): Promise<ResponseProps & { data: null | AuthResponseProps }> => {
  const response = await api.post<
    ResponseProps & { data: null | AuthResponseProps }
  >("login", formData);

  return response.data;
};

export const checkEmail = async (
  formData: FormData
): Promise<ResponseProps & { data: { tersedia: boolean } }> => {
  const response = await api.post<
    ResponseProps & { data: { tersedia: boolean } }
  >("daftar/cek-email", formData);
  return response.data;
};

export const signup = async (
  formData: FormData
): Promise<ResponseProps & { data: null | { insert_id: string } }> => {
  const response = await api.post<
    ResponseProps & { data: null | { insert_id: string } }
  >("daftar", formData);
  return response.data;
};
