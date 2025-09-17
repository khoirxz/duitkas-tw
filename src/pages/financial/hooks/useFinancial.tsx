import { useQuery } from "@tanstack/react-query";
import { fetchAllBudget } from "../services/financialApi";
import type { BudgetProps } from "../types/financial";
import type { ResponseProps } from "@/types/response";

export const useFetchBudget = () => {
  return useQuery<ResponseProps & { data: BudgetProps[] }>({
    queryKey: ["budget"],
    queryFn: () => fetchAllBudget(),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};
