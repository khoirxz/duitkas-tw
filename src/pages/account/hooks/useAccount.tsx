import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchAccount,
  postAccount,
  deteleAccount,
} from "../services/accountApi";
import { fetchBanks } from "../services/accountApi";

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

export const useCreateAccount = () => {
  return useMutation({
    mutationFn: (formData: FormData) => postAccount(formData),
  });
};

export const useUpdateAccount = () => {
  return useMutation({
    mutationFn: (formData: FormData) => postAccount(formData),
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
