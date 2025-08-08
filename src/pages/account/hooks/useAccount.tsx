import { useQuery, useMutation } from "@tanstack/react-query";
import { fetchAccount, postAccount } from "../services/accountApi";
import { fetchBanks } from "../services/accountApi";

export const useAccount = (
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

export const useBanks = () => {
  return useQuery({
    queryKey: ["banks"],
    queryFn: () => fetchBanks(),
    staleTime: 1000 * 60 * 5,
  });
};
