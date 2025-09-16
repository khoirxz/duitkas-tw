import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchAccount,
  fetchDetailAccount,
  postAccount,
  updateAccount,
  deteleAccount,
} from "../services/accountApi";
import { fetchBanks } from "../services/accountApi";
import type { AccountProps } from "../types/account";
import type { ResponseProps } from "@/types/response";

export const useFetchAccount = (
  search: string,
  page: number = 1,
  limit: number = 10
) => {
  return useQuery({
    queryKey: ["account", search, page, limit],
    queryFn: () => fetchAccount({ search, page, limit }),
    staleTime: 1000 * 60 * 5,
  });
};

export const useFetchDetailAccount = (id: string) => {
  return useQuery<
    ResponseProps & { data: AccountProps["data"]["akun"]["0"] | null }
  >({
    queryKey: ["detailAccount", id],
    queryFn: () => fetchDetailAccount(id),
    staleTime: 1000 * 60 * 5,
    enabled: !!id,
    initialData: undefined,
  });
};

export const useCreateAccount = (options?: {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (formData: FormData) => postAccount(formData),
    onSuccess: () => {
      // Refresh data account
      queryClient.invalidateQueries({ queryKey: ["account"] });

      // kalau ada tambahan logic dari luar
      options?.onSuccess?.();
    },
    onError: options?.onError,
  });
};

export const useUpdateAccount = (options?: {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}) => {
  return useMutation({
    mutationFn: (formData: FormData) => updateAccount(formData),
    ...options,
  });
};

export const useDeleteAccount = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (formData: FormData) => deteleAccount(formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["account"] });
    },
  });
};

export const useBanks = () => {
  return useQuery({
    queryKey: ["banks"],
    queryFn: () => fetchBanks(),
    staleTime: 1000 * 60 * 5,
  });
};
