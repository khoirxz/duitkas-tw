import { api } from "@/services/api";
import type { AccountProps } from "../types/account";
import type { BankProps } from "../types/bank";

export const fetchAccount = async (): Promise<AccountProps> => {
  const response = await api.get("bank/all-akun", {});
  return response.data;
};

export const postAccount = async (
  formData: FormData
): Promise<AccountProps> => {
  const response = await api.post("bank/tambah", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

export const updateAccount = async (
  formData: FormData
): Promise<AccountProps> => {
  const response = await api.put("bank/edit", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

export const fetchBanks = async (): Promise<BankProps> => {
  const response = await api.get("bank/all-bank", {});
  return response.data;
};
