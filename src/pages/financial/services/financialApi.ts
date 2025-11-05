import { api } from "@/services/api";
import type { ResponseProps } from "@/types/response";
import type { BudgetProps } from "../types/financial";

export const fetchAllBudget = async (): Promise<
  ResponseProps & { data: BudgetProps[] }
> => {
  const response = await api.get<ResponseProps & { data: BudgetProps[] }>(
    "budget"
  );
  return response.data;
};

export const postBudget = async (
  formData: FormData
): Promise<ResponseProps & { data: { insert_id: string } }> => {
  const response = await api.post<
    ResponseProps & { data: { insert_id: string } }
  >("perencanaan", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return response.data;
};

export const updateBudget = async (
  formData: FormData
): Promise<ResponseProps & { data: { affected_rows: string } }> => {
  const response = await api.post<
    ResponseProps & { data: { affected_rows: string } }
  >("perencanaan/edit", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return response.data;
};

export const postBudgetContent = async (
  formData: FormData
): Promise<ResponseProps & { data: { affected_rows: string } }> => {
  const response = await api.post<
    ResponseProps & { data: { affected_rows: string } }
  >("perencanaan/kategori", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return response.data;
};
