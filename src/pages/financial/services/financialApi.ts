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
