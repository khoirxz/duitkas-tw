import { api } from "@/services/api";
import type { AccountProps } from "../types/account";
import type { BankProps } from "../types/bank";
import type { ResponseProps } from "@/types/response";

// ambil semua data akun
export const fetchAccount = async ({
  search,
  page,
  limit,
}: {
  search: string;
  page: number;
  limit: number;
}): Promise<AccountProps> => {
  const response = await api.get("bank/all-akun", {
    params: {
      search: search,
      page: page,
      limit: limit,
    },
  });
  return response.data;
};
// tambah akun
export const postAccount = async (
  formData: FormData
): Promise<AccountProps> => {
  const response = await api.post("bank/tambah", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};
export const fetchDetailAccount = async (
  id: string
): Promise<
  ResponseProps & { data: AccountProps["data"]["akun"]["0"] | null }
> => {
  const response = await api.get(`bank/detail/${id}`);
  return response.data;
};
// update akun
export const updateAccount = async (
  formData: FormData
): Promise<AccountProps> => {
  const response = await api.put("bank/edit", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};
// delete akun
export const deteleAccount = async (
  formData: FormData
): Promise<
  ResponseProps & {
    data: {
      status: string;
      message: string;
    };
  }
> => {
  const response = await api.post("bank/hapus", formData);
  return response.data;
};
// ambil semua bank
export const fetchBanks = async (): Promise<BankProps> => {
  const response = await api.get("bank/all-bank", {});
  return response.data;
};
