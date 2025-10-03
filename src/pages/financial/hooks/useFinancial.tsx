import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  fetchAllBudget,
  postBudget,
  postBudgetContent,
} from "../services/financialApi";
import type { BudgetProps } from "../types/financial";
import type { ResponseProps } from "@/types/response";

export const useFetchBudget = () => {
  return useQuery<ResponseProps & { data: BudgetProps[] }>({
    queryKey: ["budget"],
    queryFn: () => fetchAllBudget(),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

export const useCreateBudget = (options?: {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (formData: FormData) => postBudget(formData),
    onSuccess: () => {
      // Refresh data budget
      queryClient.invalidateQueries({ queryKey: ["budget"] });

      // kalau ada tambahan logic dari luar
      options?.onSuccess?.();
    },
    onError: options?.onError,
  });
};

export const useUpdateBudget = (options?: {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (formData: FormData) => postBudget(formData),
    onSuccess: () => {
      // Refresh data budget
      queryClient.invalidateQueries({ queryKey: ["budget"] });

      // kalau ada tambahan logic dari luar
      options?.onSuccess?.();
    },
    onError: options?.onError,
  });
};

export const useCreateBudgetContent = (options?: {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (formData: FormData) => postBudgetContent(formData),
    onSuccess: () => {
      // Refresh data budget
      queryClient.invalidateQueries({ queryKey: ["budget"] });

      // kalau ada tambahan logic dari luar
      options?.onSuccess?.();
    },
    onError: options?.onError,
  });
};
